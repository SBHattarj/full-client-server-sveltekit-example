import { createPost } from "$lib/posts/posts"
import { fail, redirect } from "@sveltejs/kit"
import type { Actions } from "./$types"
import { DatabaseError } from "pg"
export const actions: Actions = {
    async default({ request, cookies }) {
        const formData = await request.formData()
        const title = formData.get("title") as string
        const content = formData.get("content") as string
        if(title == null) return fail(400, { title: "required" })
        if(content == null) return fail(400, { content: "required" })
        let id = cookies.get("userId")
        if(id == null) return redirect(302, "/login")
        let user = parseInt(id)
        let post: Awaited<ReturnType<typeof createPost>> | null = null
        try {
            post = await createPost({ title, content, user })
        }
        catch(error) {
            if(error instanceof DatabaseError) {
                const [_, field, constraint] = error.constraint?.split('_') ?? ["", "", ""]
                if(field === "title" && constraint === "unique") return fail(
                        400, 
                        { title: "already taken" }
                )

            }
        } 
        if(post != null) throw redirect(302, `/posts/view/${post.id}`)
        return fail(400, { __error: "server error" })
    }
}
