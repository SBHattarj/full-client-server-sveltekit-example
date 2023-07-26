import { getSession } from "./index"
import { browser } from "$app/environment"
import { get } from "svelte/store"
import { getCookieStore } from "./cookie"
import { writable, type Writable } from "svelte/store"
import type { Session } from "./session"
import { page } from "$app/stores"

let cookieStore = getCookieStore()
let {subscribe, set}: Writable<Session | null> = writable(null)
let sessionStore = {subscribe}

let unsubscribeCookie = () => {}
if(browser) {
    let session = await getSession()
    await (await session.setCookies(get(cookieStore))).loadUserData()
    page.subscribe(async () => {
        const cookie = get(cookieStore)
        console.log(cookie.get("userId"))
        await (await session.setCookies(cookie)).loadUserData()
    })
    set(session)
    session.subscribe(
        (session) => {
            set(session)
        }
    )
}

export { sessionStore, unsubscribeCookie }
