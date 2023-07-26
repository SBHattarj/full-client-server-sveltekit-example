import { countPosts, getAllPosts } from "$lib/posts/posts"
import type { PageServerLoad } from "./$types"

export const load = (async function load({ params }) {
    const offset = parseInt(params.offset)
    const posts = await getAllPosts(4, offset)
    const count = await countPosts()

    return {
        posts,
        offset,
        count
    }
}) satisfies PageServerLoad
