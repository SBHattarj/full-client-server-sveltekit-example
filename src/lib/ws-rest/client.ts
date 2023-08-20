import type { WebSocketLike } from "full-client-server-sveltekit";
import EventListener from "events"

async function connect(url: string): Promise<{ok: boolean, data: any, status: string}> {
    return fetch(`${url}?${new URLSearchParams({connection: "true"})}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    }).then(res => res.json()).catch(() => connect(url))
}

async function getWSData(url: string, sessionId: string): Promise<{ok: boolean, data: any, status: string}> {
    return fetch(`${url}?${new URLSearchParams({sessionId})}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
    }).then(res => res.json()).catch(() => getWSData(url, sessionId))
}


export class RestWebSocket implements WebSocketLike {
    sessionId?: string
    async *WSIterator(): AsyncGenerator<{ok: boolean, data: any, status: string}> {
        yield await connect(this.url)
        while(true) {
            console.log(this.sessionId)
            if(this.sessionId == null) {
                yield {ok: false, status: "connecting", data: {}}
            } else {
                yield await getWSData(this.url, this.sessionId)
            }
        }
    }
    wsIterator: AsyncGenerator<{ok: boolean, data: any, status: string}>
    internalEventListener: EventListener
    connected: boolean
    constructor(public url: string) {
        this.wsIterator = this.WSIterator();
        this.internalEventListener = new EventListener()
        this.connected = false
        this.init()
    }
    onopen() {}
    async init() {
        this.internalEventListener.emit("connection-browser", "connection");
        for await (let {ok, data, status} of this.wsIterator) {
            if(!ok && status === "timeout") {
                console.info("fetch timeout reconnecting")
                continue
            }
            if(status === "connection") {

                this.connected = true
                console.info("websocket connected")
                this.internalEventListener.emit("connection-browser", "connection");
                this.sessionId = data.sessionId
                this.onopen()
            }
            if(!ok) {
                continue
            }
            console.info("server sent data", data)
            if(data) this.internalEventListener.emit("message-browser", data);
        }
    }
    addEventListener(event: string, callback: (event: { data: { toString(): string; }; }) => void): void {
        this.internalEventListener.on(`${event}-browser`, data => {
            callback({data})
        })
    }
    send(data: string) {
        fetch(`${this.url}?${new URLSearchParams({sessionId: this.sessionId ?? ""})}`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/text",
                Accept: "application/json"
            },
            body: data
        })
    }
}
