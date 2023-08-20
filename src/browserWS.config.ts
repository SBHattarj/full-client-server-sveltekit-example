import { RestWebSocket } from "$lib/ws-rest"
export function wsInit() {
    return new RestWebSocket("/ws")
}
