import { getPostById } from "$lib/posts/posts";
import type { PageServerLoad } from "./$types";
export const load = (async ({ params, cookies }) => {
    const postId = parseInt(params.postId)
    const id = parseInt(cookies.get("userId")!)
    const post = await getPostById(postId)
    return {
        post,
        id
    }
}) satisfies PageServerLoad
