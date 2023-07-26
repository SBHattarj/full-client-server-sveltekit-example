import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { createUser } from "$lib/user/User";
import { signup } from "$lib/auth/user";
export const actions: Actions = {
    async default({ request, cookies }) {
        const formData = await request.formData();
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        if(password !== confirmPassword) return fail(304, { confirmPassword: "Passwords do not match" });
        const user = await signup(name, email, password)
        if(user.nameAlreadyTaken) return fail(304, { name: "already taken" });
        if(user.emailAlreadyTaken) return fail(304, { email: "already taken" });
        if(user.id === -1) return fail(304, {__error: "internal server error"});
        cookies.set("userId", user.id.toString(), { httpOnly: false });
        throw redirect(302, "/");
    }
}
