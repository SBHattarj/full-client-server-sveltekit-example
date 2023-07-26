import { getPostById, updatePost } from '$lib/posts/posts';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load = (async ({ params, cookies }) => {
    const postId = parseInt(params.postId);
    const post = await getPostById(postId);
    const id = cookies.get('userId');
    const userId = parseInt(id ?? "-1");
    console.log(postId)
    if(userId !== post.user?.id) {
        throw redirect(303, '/');
    }
    return {
        title: post.title,
        id: post.id
    
    }
}) satisfies PageServerLoad;

export const actions = {
    async default({ request, params }) {
        const formData = await request.formData();
        const content = formData.get("content") as string;
        const id = parseInt(params.postId)
        await updatePost(id, { content })
        throw redirect(303, `/posts/view/${id}`)
    }
} as Actions
