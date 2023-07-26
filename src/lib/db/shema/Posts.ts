import { text, pgTable, serial, date, integer } from "drizzle-orm/pg-core";
import { UserModel } from "./User";
import type { InferModel } from "drizzle-orm";

export const PostModel = pgTable('posts' , {
    id: serial("id").primaryKey(),
    title: text("title").notNull().unique(),
    content: text("content").notNull(),
    createdAt: date("created_at").defaultNow().notNull(),
    updatedAt: date("updated_at").defaultNow().notNull(),
    user: integer("user").references(() => UserModel.id).notNull()
})
export type Post = InferModel<typeof PostModel>
export type NewPost = InferModel<typeof PostModel, 'insert'>
