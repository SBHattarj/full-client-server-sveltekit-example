import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { getAllPostsFromUser, countPostsFromUser, countPosts} from "$lib/posts/posts";
import { getUserById, updateUser } from "$lib/user/User";
import { DatabaseError } from "pg";
export const actions: Actions = {
    logout({ cookies }) {
        cookies.delete("userId");
        throw redirect(302, "/login");
    },
    async updateEmail({ request, cookies }) {
        const formData = await request.formData()
        const email = formData.get("email") as string;
        const id = cookies.get("userId")
        if(id == null) throw redirect(302, "/login")
        const userId = parseInt(id)
        try {
            await updateUser(userId, {email})
            return { success: true }
        } catch(error) {
            if(error instanceof DatabaseError) {
                const [_, field, constraint] = error.constraint?.split('_') ?? ["", "", ""]
                if(field === "email" && constraint === "unique") {
                    return fail(302, { email: "already taken" })
                }
            }
        }

    }
}

export const load = (async ({request, cookies, url}) => {
    const id = parseInt(cookies.get("userId")!)
    const myPosts = await getAllPostsFromUser(id, 4, 0)
    const myPostCounts = await countPostsFromUser(id)
    const totalCount = await countPosts()
    const userData = await getUserById(id)
    console.log(myPostCounts)
    return {
        myPosts,
        myPostCounts,
        userId: id,
        extraPosts: totalCount - myPostCounts,
        userData,
        updateEmail: cookies.get("updateEmail") === "true",

    }
}) satisfies PageServerLoad
