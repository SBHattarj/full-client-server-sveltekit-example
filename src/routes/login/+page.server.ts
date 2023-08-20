import type { Actions, PageServerLoad } from "./$types";
import { checkUser } from "$lib/auth/user";
import { redirect, fail } from "@sveltejs/kit";
export const actions: Actions = {
    async default({ cookies, request }) {
        const formData = await request.formData();
        const name = formData.get("name");
        const password = formData.get("password");
        const email = formData.get("email");
        if(name == null || password == null || email == null) {
            return { success: false };
        }

        const res = await checkUser(name as string, email as string, password as string);
        if(res.id !== -1) {
            cookies.set("userId", res.id.toString(), { httpOnly: false});
            throw redirect(302, "/");
        }
        if(res.nameNotFound) return fail(400, { name: "not found" });
        if(res.emailMismatch) return fail(400, { email: "email mismatch" });
        if(res.passwordMismatch) return fail(400, { password: "password mismatch" });
        return fail(400, { __form: "server error" });
    }
}
