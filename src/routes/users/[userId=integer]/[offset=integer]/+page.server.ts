import { countPosts, getAllPostsFromUser } from "$lib/posts/posts"
import { getUserById } from "$lib/user/User"
import type { PageServerLoad } from "./$types"

export const load = (async function load({ params }) {
    const offset = parseInt(params.offset)
    const userId = parseInt(params.userId)
    const posts = await getAllPostsFromUser(userId, 4, offset)
    const count = await countPosts()
    const user = await getUserById(userId)

    return {
        posts,
        offset,
        count,
        user
    }
}) satisfies PageServerLoad
