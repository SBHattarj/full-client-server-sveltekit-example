import WS from "$lib/ws"
import { RestWebSocketServer } from "$lib/ws-rest/server";
import type { Handle } from "@sveltejs/kit";

let unprotectedPaths = new Set(["/login", "/signup"]);

WS(() => {
})(new RestWebSocketServer())

export const handle: Handle = async({ event, resolve }) => {
    if(event.url.pathname == "/ws") return await resolve(event)
    let isUnprotectedPath = unprotectedPaths.has(event.url.pathname);

    if(
            event.cookies.get("userId") == null 
            && !isUnprotectedPath
    ) return new Response('Redirect', { status: 302, headers: { Location: '/login' }})
    if(event.cookies.get("userId") != null) {
        const userId = event.cookies.get("userId")!
        event.cookies.delete("userId")
        event.cookies.set("userId", userId, { httpOnly: false, path: "/" })
    }
    if(event.cookies.get("userId") != null && isUnprotectedPath) return new Response('Redirect', { status: 302, headers: { Location: '/' }})
    return await resolve(event)
}
