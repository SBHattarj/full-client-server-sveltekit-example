import handleWS from "$lib/ws"
import type { Handle } from "@sveltejs/kit";
let unprotectedPaths = new Set(["/login", "/signup"]);
export const handleWs = handleWS((wsEvents) => {
});

export const handle: Handle = async({ event, resolve }) => {
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
