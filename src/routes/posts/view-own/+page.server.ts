import { getAllPostsFromUser } from "$lib/posts/posts"
import type { PageServerLode } from "./$types"

export const load = (async function load({ cookies }) {
    const id = parseInt(cookies.get("userId")!)
    const myPosts = await getAllPostsFromUser(id, 4, 0)
    return {
        myPosts
    }
}) satisfies PageServerLode
