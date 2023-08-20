import EventEmitter from 'events';
import type { WebSocketServerLike, WebSocketLike } from 'full-client-server-sveltekit/ws-events';
export const wsEmitter = new EventEmitter();

export const sessions = new Map<string, {
    sessionDisconnectTimeout?: NodeJS.Timeout,
    fetchTimeout?: NodeJS.Timeout,
    fetchCallback?: (...args: any[]) => void,
    messages: any[]
}>

export class RestWebSocket implements WebSocketLike {
    constructor(public sessionId: number) {
        
    }
    addEventListener(event: string, callback: (event: { data: { toString(): string; }; }) => void): void {
        wsEmitter.on(`${event}-server-${this.sessionId}`, data => {
            callback({data: data})
        })
    }
    onopen() {}
    send(data: string): void {
        console.log("sending data to", this.sessionId)
        wsEmitter.emit(`send-browser-${this.sessionId}`, {ok: true, data: data})
    }
}

export class RestWebSocketServer implements WebSocketServerLike {
    on(event: "connection", callback: (ws: WebSocketLike) => void) {
        wsEmitter.on(event, sessionId => {
            callback(new RestWebSocket(sessionId))
        })
        return this
    }
}
