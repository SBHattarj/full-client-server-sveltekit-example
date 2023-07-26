// place files you want to import through the `$lib` alias in this folder.

import node, { From } from "full-client-server-sveltekit";
import type { Post } from "$lib/db/shema/Posts";
import { writable } from "svelte/store";
import type { User } from "./db/shema/User";

export function getSession() {
    return node(async () => {
        const { Session } = await import("./session");
        const session = new Session();
        return session
    })
}
export function createOptionalStore<T = any>() {
    const store = writable<T | null>()
    return {
        subscribe: store.subscribe,
        set(value: {subscribe: ((fn: (self: T) => any) => any)}) {
            value.subscribe(self => store.set(self))
        }
    }
}

export function onPostChange(fn: (self: Post) => any) {
    return node(async () => {
        const { dbEvent } = await import("$lib/db")
        dbEvent.on("postUpdated", fn)
    })
}
export function onPostChangeOfUser(id: number, fn: (self: Post & {user: User}) => any) {
    return node(async () => {
        const { db, dbEvent } = await import("$lib/db")
        const { eq } = await import("drizzle-orm")
        const { UserModel, publicUserFields } = await import("$lib/db/shema/User")
        dbEvent.on("postUpdated", async e => {
            if(e.id === id) { 
                e.user = (await db.select(publicUserFields)
                        .from(UserModel)
                        .where(eq(UserModel.id, e.user))
                )[0]
                fn(e)
            }
        })
    })
}

export function offPostChange(fn: (self: Post & {user: User}) => any) {
    return node(async () => {
        const { dbEvent } = await import("$lib/db")
        dbEvent.off("postUpdated", fn)
    })
}


export function onPostChangeByUser(id: number, fn: (self: Post) => any) {
    return node(async () => {
        const { dbEvent } = await import("$lib/db")
        dbEvent.on("postUpdated", async e => {
            if(e.user === id) { 
                fn(e)
            }
        })
    })
}

export function onPostAdded(fn: (self: Post) => any) {
    return node(async () => {
        const { dbEvent } = await import("$lib/db")
        dbEvent.on("postCreated", fn)
    })
}
export function offPostAdded(fn: (self: Post) => any) {
    return node(async () => {
        const { dbEvent } = await import("$lib/db")
        dbEvent.off("postCreated", fn)
    })
}
