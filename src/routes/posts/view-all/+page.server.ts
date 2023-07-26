import { getAllPosts, countPosts } from "$lib/posts/posts"
import type { PageServerLode } from "./$types"

export const load = (async function load() {
    const posts = await getAllPosts(4, 0)
    const count = await countPosts()
    return {
        posts,
        count
    }
}) satisfies PageServerLode
