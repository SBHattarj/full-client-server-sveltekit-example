import { RestWebSocket } from "$lib/ws-rest/client"
export function wsInit() {
    return new RestWebSocket("/ws")
}
