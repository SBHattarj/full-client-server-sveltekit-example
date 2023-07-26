import type  Cookies from "js-cookie";
import { writable } from "svelte/store";
import { browser } from "$app/environment";

let cookieStore: typeof Cookies | undefined;
if(browser) {
    cookieStore = (await import("js-cookie")).default
}
export function getCookieStore() {
    const store = writable<typeof Cookies>()
    if(cookieStore) {
        store.set({
            get: cookieStore.get,
            set: cookieStore.set,
            remove: cookieStore.remove,
            attributes: cookieStore.attributes,
            converter: cookieStore.converter,
            withAttributes: cookieStore.withAttributes,
            withConverter: cookieStore.withConverter
        })
        cookieStore.set("a", "2")
        
        import("cookie-store").then(({cookieStore: cs}) => {
            cs.onchange = () => {
                if(cookieStore == null) return
                store.set({
                    get: cookieStore.get,
                    set: cookieStore.set,
                    remove: cookieStore.remove,
                    attributes: cookieStore.attributes,
                    converter: cookieStore.converter,
                    withAttributes: cookieStore.withAttributes,
                    withConverter: cookieStore.withConverter
                })
            }
        })
    }
    return { subscribe: store.subscribe };

}
