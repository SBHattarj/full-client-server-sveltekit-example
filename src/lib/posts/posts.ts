import type { NewPost } from "../db/shema/Posts";
import node from "full-client-server-sveltekit";
import { db, dbEvent } from "server:/lib/db";
import { eq, desc, sql } from "server:npm:drizzle-orm";
import { PostModel } from "server:/lib/db/shema/Posts";
import  { UserModel, publicUserFields } from "server:/lib/db/shema/User";

export function createPost(post: NewPost) {
    return node(async () => {
        const postValues = await db.insert(PostModel).values(post).returning()
        dbEvent.emit("postCreated", postValues[0])
        return postValues[0]
    })
}

export function getAllPosts(limit: number, offset: number) {
    return node(async () => {
        return await db.select({
            user: publicUserFields,
            title: PostModel.title,
            content: PostModel.content,
            createdAt: PostModel.createdAt,
            updatedAt: PostModel.updatedAt,
            id: PostModel.id,
        }).from(PostModel)
            .leftJoin(UserModel, eq(UserModel.id, PostModel.user))
            .orderBy(desc(PostModel.id))
            .limit(limit)
            .offset(offset)
    })
}

export function getAllPostsFromUser(id: number, limit: number, offset: number) {
    return node(async () => {
        return await db.select({
            title: PostModel.title,
            content: PostModel.content,
            createdAt: PostModel.createdAt,
            updatedAt: PostModel.updatedAt,
            id: PostModel.id,
        }).from(PostModel)
            .where(eq(PostModel.user, id))
            .orderBy(desc(PostModel.id))
            .limit(limit)
            .offset(offset)
    })
}

export function getPostById(id: number) {
    return node(async () => {
        return (await db.select({
            title: PostModel.title,
            content: PostModel.content,
            createdAt: PostModel.createdAt,
            updatedAt: PostModel.updatedAt,
            id: PostModel.id,
            user: publicUserFields
        }).from(PostModel)
            .where(eq(PostModel.id, id))
            .leftJoin(UserModel, eq(PostModel.user, UserModel.id))
        )[0]
    })
}
export function postExists(title: string) {
    return node(async () => {
        return (await db.select().from(PostModel).where(eq(PostModel.title, title)))[0] != null
    })
}

export function updatePost(id: number, updates: Partial<NewPost>) {
    return node(async () => {
        const posts = await db.update(PostModel)
            .set({...updates, updatedAt: sql`now()`})
            .where(eq(PostModel.id, id))
            .returning()
        dbEvent.emit("postUpdated", posts[0])
    })
}

export function countPosts() {
    return node(async () => {
        const [{count}] = await db
            .select({count: sql<string>`count(*)`})
            .from(PostModel)

        return parseInt(count)
    })
}
export function countPostsFromUser(id: number) {
    return node(async () => {

        const [{count}] = await db
            .select({count: sql<string>`count(*)`})
            .from(PostModel)
            .where(eq(PostModel.user, id))

        return parseInt(count)
    })
}
