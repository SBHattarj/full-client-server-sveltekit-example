import type { RequestHandler } from './$types';
import { EventEmitter } from 'events';
import crypto from "crypto"
import { wsEmitter, sessions } from '$lib/ws-rest/server';


export const GET: RequestHandler = (event) => {
    let sessionId = event.url.searchParams.get("sessionId") ?? ""
    if(event.url.searchParams.get("connection") || !sessions.has(sessionId) || sessions.get(sessionId) == null) {
        sessionId = crypto.randomUUID()
        event.cookies.set("session-id", sessionId)
        sessions.set(sessionId, {messages: []})
        console.info("new session", sessionId)
        wsEmitter.emit('connection', sessionId)
        return new Response(JSON.stringify({ok: true, status: "connection", data: {sessionId}}))
    }
    clearTimeout(sessions.get(sessionId)?.sessionDisconnectTimeout) 
    clearTimeout(sessions.get(sessionId)?.fetchTimeout)
    console.info("new fetch", sessionId)
    const data = sessions.get(sessionId)?.messages?.shift()
    if(data != null) {
        if(sessions.get(sessionId) != null) sessions.get(sessionId)!.sessionDisconnectTimeout = setTimeout(() => {
            console.info("disconnected", sessionId)
            sessions.delete(sessionId)
        }, 2 * 60 * 1000)
        console.info(sessionId, "session sending data to browser", data)
        return new Response(JSON.stringify(data))
    }
    return new Promise(resolve => {
        sessions.get(sessionId)!.fetchTimeout = setTimeout(() => {
            console.info("session fetch timeout", sessionId)
            wsEmitter.emit(`send-browser-${sessionId}`, {ok: false, status: "timeout"})
        }, 60 * 1000)
        if(sessions.get(sessionId)?.fetchCallback != null) {
            wsEmitter.off(
                `send-browser-${sessionId}`,
                sessions.get(sessionId)!.fetchCallback!
            )
        }
        sessions.get(sessionId)!.fetchCallback = (data) => {
            if(sessions.get(sessionId) != null) sessions.get(sessionId)!.sessionDisconnectTimeout = setTimeout(() => {
                console.info("disconnected", sessionId)
                sessions.delete(sessionId)
            }, 2 * 60 * 1000)
            console.info(sessionId, "session sending data to browser", data)
            resolve(new Response(JSON.stringify(data)));
            if(sessions.get(sessionId) != null) {
                sessions.get(sessionId)!.fetchCallback = (data) => {
                    let currentSession = sessions.get(sessionId)
                    if(currentSession != null) {
                        currentSession.messages.push(data)
                    }
                }
                wsEmitter.on(`send-browser-${sessionId}`, sessions.get(sessionId)!.fetchCallback!)
            }

        }
        wsEmitter.once(`send-browser-${sessionId}`, sessions.get(sessionId)!.fetchCallback!)
    })
}

export const POST: RequestHandler = async (event) => {
    let sessionId = event.url.searchParams.get("sessionId")
    if(sessionId == null || sessionId === "") return new Response("No session found")
    if(!sessions.has(sessionId) || sessions.get(sessionId) == null) return new Response("No session found")
    clearTimeout(sessions.get(sessionId)?.sessionDisconnectTimeout) 
    let data = await event.request.text()
    wsEmitter.emit(`message-server-${sessionId}`, data)
    sessions.get(sessionId)!.sessionDisconnectTimeout = setTimeout(() => {
        if(sessionId == null) return
        console.info("disconnected", sessionId)
        sessions.delete(sessionId)
    }, 2 * 60 * 1000)
    console.info(sessionId, "session sent data:", data)
    return new Response("ok")
}


