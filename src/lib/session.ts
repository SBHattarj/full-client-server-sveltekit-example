import type Cookies from "js-cookie"
import { createUser, getUserById, updateUser } from "./user/User"
import { env } from "$env/dynamic/private"
import { createHmac } from "crypto"
import { EventEmitter } from "events"
import type { User } from "./db/shema/User"
import { checkUser } from "./auth/user"
import { dbEvent } from "./db"

export function hashPassword(password: string) {
    return createHmac('sha256', env.SECRET!)
        .update(password)
        .digest('hex')
}
export function checkPassword(password: string, hash: string) {
    return hash === hashPassword(password)
}

export type LoginResult = {
    id: number,
    nameNotFound?: boolean,
    emailMismatch?: boolean,
    passwordMismatch?: boolean
} 

export class Session extends EventEmitter {
    userId?: number
    userData?: Omit<User, 'password' | 'id'>
    userUpdateCB(e: User) {
        if(e.id === this.userId) {
            this.userData = {
                name: e.name,
                email: e.email,
            }
            this.emit("change", this)
        }
    }
    constructor(
        public cookies?: typeof Cookies
    ) {
        super()
        this.setMaxListeners(10000)
        dbEvent.on("userUpdated", this.userUpdateCB.bind(this))
    }
    destroy() {
        dbEvent.off("userUpdated", this.userUpdateCB)
    }
    async loadUserData() {
        let id = await this.cookies?.get("userId")
        if(id == null) {
            this.userId = undefined
            this.userData = undefined
            this.emit("change", this)
            return
        }
        this.userId = parseInt(id)
        const user = await getUserById(this.userId)
        if(user == null && this.userData != null) {
            this.userId = undefined
            this.userData = undefined
            this.emit("change", this)
            return
        }
        this.userData = user
        this.emit("change", this)
        return this
    }
    async setCookies(cookies: typeof Cookies) {
        this.cookies = cookies
        const id = await this.cookies.get("userId")
        return this
    }
    async login(name: string, email: string, password: string): Promise<LoginResult> {
        const checkResult = await checkUser(name, email, password)
        this.userId = checkResult.id
        await this.cookies?.set("userId", checkResult.id.toString())
        this.emit("login", checkResult)
        this.emit("change", this)
        return {
            id: checkResult.id,
        }
    }
    async signup(name: string, email: string, password: string) {
        const user = await createUser({
            name,
            email,
            password: hashPassword(password),
        })
        await this.cookies?.set("userId", user.id.toString())
        this.emit("signup", user)
        this.emit("change", this)
        return {
            id: user.id
        }
    }
    async logout() {
        this.userData = undefined
        this.userId = undefined
        await this.cookies?.remove("userId")
        this.emit("logout", this)
    }
    async updatePassword(password: string) {
        if(this.userId == null) return false
        await updateUser(this.userId, {
            password: hashPassword(password),
        })
        this.emit("change", this)
        return true
    }
    subscribe(fn: ((self: this) => any)) {
        this.on("change", fn)
        fn(this)
        return () => this.off("change", fn)
    }
}
