import type { PageServerLoad } from "./$types";
import { getUserByIdWithPosts } from "$lib/user/User";
import { countPostsFromUser } from "$lib/posts/posts";
export const load = (async ({ params }) => {
    const id = parseInt(params.userId)
    const user = await getUserByIdWithPosts(id, 4)
    const postCount = await countPostsFromUser(id)
    return {
        ...user,
        postCount
    }
}) satisfies PageServerLoad
