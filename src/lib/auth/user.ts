import { createUser } from "../user/User"
import node from "full-client-server-sveltekit"
import { checkPassword, hashPassword, type LoginResult } from "../session"
import { DatabaseError } from "pg"
import { db } from "server:/lib/db"
import { eq } from "server:npm:drizzle-orm"
import { UserModel } from "server:/lib/db/shema/User"
export function checkUser(name: string, email: string, password: string): Promise<LoginResult> {
    return node(async () => {
        const user = (await db.select().from(UserModel).where(eq(UserModel.name, name)))[0]
        if(user == null) {
            return {
                id: -1,
                nameNotFound: true,
            }
        }
        if(user.email !== email) {
            return {
                id: -1,
                emailMismatch: true,
            }
        }
        if(!checkPassword(password, user.password)) {
            return {
                id: -1,
                passwordMismatch: true,
            }
        }
        return {
            id: user.id
        }
    })
}

type SignupResult = {
    id: number,
    nameAlreadyTaken?: boolean,
    emailAlreadyTaken?: boolean,
}

export function signup(name: string, email: string, password: string): Promise<SignupResult> {
    return node(async () => {
        try {
            const user = await createUser({
                name,
                email,
                password: hashPassword(password),
            })

        return {
            id: user.id
        }
        } catch(error) {
            if(error instanceof DatabaseError) {
                const [_, field, constraint] = error.constraint?.split('_') ?? ["", "", ""]
                if(field === "name" && constraint === "unique") return {
                    id: -1,
                    nameAlreadyTaken: true,
                }
                if(field === "email" && constraint === "unique") return {
                    id: -1,
                    emailAlreadyTaken: true,
                }
                return { id: -1 }
            }
            return {
                id: -1
            }
        }
    })
}
