import { countPostsFromUser, getAllPostsFromUser } from "$lib/posts/posts"
import type { PageServerLode } from "./$types"

export const load = (async function load({ cookies, params }) {
    const id = parseInt(cookies.get("userId")!)
    const offset = parseInt(params.offset)
    const myPosts = await getAllPostsFromUser(id, 4, offset)
    const count = await countPostsFromUser(id)

    return {
        myPosts,
        offset,
        count
    }
}) satisfies PageServerLode
