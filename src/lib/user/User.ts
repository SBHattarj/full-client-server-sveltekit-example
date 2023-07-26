import node from "full-client-server-sveltekit";
import type { NewUser } from "../db/shema/User";
import type { Post } from "../db/shema/Posts";
import { db, dbEvent } from "server:/lib/db";
import { desc, eq } from "server:npm:drizzle-orm";
import { UserModel, publicUserFields } from "server:/lib/db/shema/User";
import { PostModel } from "server:/lib/db/shema/Posts";

export function getAllUsers(limit: number, offset: number) {
    return node(async () => {
        return await db.select(publicUserFields).from(UserModel).orderBy(desc(UserModel.id)).limit(limit).offset(offset)
    })
}

export function getUserById(id: number) {
    return node(async () => {
        return (await db.select(publicUserFields).from(UserModel).where(eq(UserModel.id, id)))[0]
    })
}
export function getUserByName(name: string) {
    return node(async () => {
        return (await db.select(publicUserFields).from(UserModel).where(eq(UserModel.name, name)))[0]
    })
}
export function userExists(name: string) {
    return node(async () => {
        const user = await getUserByName(name)
        return user != null
    })
}
export function emailExists(email: string) {
    return node(async () => {
        const user = (
            await db.select({email: UserModel.email})
            .from(UserModel)
            .where(eq(UserModel.email, email))
        )[0]
        return user != null
    })
}
export function userEmailMatch(name: string, email: string) {
    return node(async () => {
        const user = await getUserByName(name)
        return user?.email === email
    })
}

export function getUserByIdWithPosts(id: number, maxPosts: number) {
    return node(async () => {
        const users = await db.select({
            posts:  PostModel,
            ...publicUserFields,
        }).from(UserModel)
            .where(eq(UserModel.id, id))
            .orderBy(desc(PostModel.id))
            .leftJoin(PostModel, eq(PostModel.user, UserModel.id))
            .limit(maxPosts)
        return users.reduce((acc, user) => {
            return { ...acc, posts: [...acc.posts, ...(user.posts !== null ? [user.posts] : [])] }
        }, {...users[0], posts: [] as Post[]})
    })
}
export function createUser(user: NewUser) {
    return node(async () => {
        const users = await db.insert(UserModel).values(user).returning(publicUserFields)
        dbEvent.emit("userCreated", users[0])
        return users[0]
    })
}


export function updateUser(id: number, updates: Partial<NewUser>) {
    return node(async () => {
        const users = await db.update(UserModel)
            .set(updates)
            .where(eq(UserModel.id, id))
            .returning(publicUserFields)
        dbEvent.emit("userUpdated", users[0])
        return users[0]
        
    })
}



