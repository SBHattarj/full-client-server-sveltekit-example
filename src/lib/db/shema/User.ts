import type { InferModel } from "drizzle-orm";
import { integer, text, serial, pgTable } from "drizzle-orm/pg-core";

export const UserModel = pgTable('users', {
    id: serial("id").primaryKey(),
    name: text("name").unique().notNull(),
    email: text("email").unique().notNull(),
    password: text("password").notNull(),
})
export const publicUserFields = {
    id: UserModel.id,
    name: UserModel.name,
    email: UserModel.email,
}
export type User = InferModel<typeof UserModel>
export type NewUser = InferModel<typeof UserModel, 'insert'>

