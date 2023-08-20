import WSEvents from "full-client-server-sveltekit/ws-events";
import { serialize, deserialize } from "full-client-server-sveltekit";
/** @typedef {import("full-client-server-sveltekit").CacheData} CacheData */
/** @typedef {import("full-client-server-sveltekit/ws-events").WebSocketServerLike} WebSocketServer */
/** @typedef {import("full-client-server-sveltekit/ws-events").WebSocketLike} WebSocket */


/**
* @param {(wse: import("full-client-server-sveltekit/ws-events").WSEventHandler) => any} cb
* @param {(wss: WebSocketServer, ws: WebSocket) => boolean} [validator]
* @param {(cache: CacheData, wss: WebSocketServer, ws: WebSocket) => void} [dispose]
* @return {(wse: WebSocketServer) => void}
*/
export default function handleWs(cb, validator, dispose) {
    return function handleWse(wss) {
        wss.on("connection", ws => {
            if(validator != null && !validator?.(wss, ws)) return
            /** @type {CacheData} */
            let data = {
                cache: {},
                functionRef: new Map(),
                functionMap: new Map(),
                weakRef: new WeakMap()
            }
            ws.onclose = function () {
                if(dispose != null) {
                    dispose(data, wss, ws)
                    return
                }
                delete data.cache
                delete data.functionRef
                delete data.functionMap
                delete data.weakRef
            }
            
            const wsEvents = WSEvents(ws);
            
            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-0", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { Session } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/session");
// @ts-ignore
                    const session = new Session();
// @ts-ignore
                    return session;
// @ts-ignore
                  }

                const result = await caller();
                update();
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-0-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-1", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, fn, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { dbEvent } = await import("$lib/db");
// @ts-ignore
                    dbEvent.on("postUpdated", fn);
// @ts-ignore
                  }

                const result = await caller();
                update(fn);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-1-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-2", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, fn, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { db, dbEvent } = await import("$lib/db");
// @ts-ignore
                    const { eq } = await import("drizzle-orm");
// @ts-ignore
                    const { UserModel, publicUserFields } = await import("$lib/db/shema/User");
// @ts-ignore
                    dbEvent.on("postUpdated", async (e) => {
// @ts-ignore
                      if (e.id === id) {
// @ts-ignore
                        e.user = (await db.select(publicUserFields).from(UserModel).where(eq(UserModel.id, e.user)))[0];
// @ts-ignore
                        fn(e);
// @ts-ignore
                      }
// @ts-ignore
                    });
// @ts-ignore
                  }

                const result = await caller();
                update(id, fn);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-2-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-3", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, fn, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { dbEvent } = await import("$lib/db");
// @ts-ignore
                    dbEvent.off("postUpdated", fn);
// @ts-ignore
                  }

                const result = await caller();
                update(fn);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-3-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-4", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, fn, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { dbEvent } = await import("$lib/db");
// @ts-ignore
                    dbEvent.on("postUpdated", async (e) => {
// @ts-ignore
                      if (e.user === id) {
// @ts-ignore
                        fn(e);
// @ts-ignore
                      }
// @ts-ignore
                    });
// @ts-ignore
                  }

                const result = await caller();
                update(id, fn);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-4-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-5", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, fn, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { dbEvent } = await import("$lib/db");
// @ts-ignore
                    dbEvent.on("postCreated", fn);
// @ts-ignore
                  }

                const result = await caller();
                update(fn);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-5-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-6", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, fn, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const { dbEvent } = await import("$lib/db");
// @ts-ignore
                    dbEvent.off("postCreated", fn);
// @ts-ignore
                  }

                const result = await caller();
                update(fn);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/index.ts-6-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("__internal_full_client_server_import__/lib/db?=,db=db,dbEvent=dbEvent", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db")

                const result = await caller();
                update();
                wsEvents.emit(`__internal_full_client_server_import__/lib/db?=,db=db,dbEvent=dbEvent-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("__internal_full_client_server_import__drizzle-orm?=,eq=eq,desc=desc,sql=sql", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => await import("drizzle-orm")

                const result = await caller();
                update();
                wsEvents.emit(`__internal_full_client_server_import__drizzle-orm?=,eq=eq,desc=desc,sql=sql-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("__internal_full_client_server_import__/lib/db/shema/Posts?=,PostModel=PostModel", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts")

                const result = await caller();
                update();
                wsEvents.emit(`__internal_full_client_server_import__/lib/db/shema/Posts?=,PostModel=PostModel-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("__internal_full_client_server_import__/lib/db/shema/User?=,UserModel=UserModel,publicUserFields=publicUserFields", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User")

                const result = await caller();
                update();
                wsEvents.emit(`__internal_full_client_server_import__/lib/db/shema/User?=,UserModel=UserModel,publicUserFields=publicUserFields-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-0", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, post, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db, dbEvent: dbEvent } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const postValues = await db.insert(PostModel).values(post).returning();
// @ts-ignore
                    dbEvent.emit("postCreated", postValues[0]);
// @ts-ignore
                    return postValues[0];
// @ts-ignore
                  }

                const result = await caller();
                update(post);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-0-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-1", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, limit, offset, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq, desc: desc } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return await db.select({
// @ts-ignore
                      user: publicUserFields,
// @ts-ignore
                      title: PostModel.title,
// @ts-ignore
                      content: PostModel.content,
// @ts-ignore
                      createdAt: PostModel.createdAt,
// @ts-ignore
                      updatedAt: PostModel.updatedAt,
// @ts-ignore
                      id: PostModel.id
// @ts-ignore
                    }).from(PostModel).leftJoin(UserModel, eq(UserModel.id, PostModel.user)).orderBy(desc(PostModel.id)).limit(limit).offset(offset);
// @ts-ignore
                  }

                const result = await caller();
                update(limit, offset);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-1-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-2", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, limit, offset, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq, desc: desc } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return await db.select({
// @ts-ignore
                      title: PostModel.title,
// @ts-ignore
                      content: PostModel.content,
// @ts-ignore
                      createdAt: PostModel.createdAt,
// @ts-ignore
                      updatedAt: PostModel.updatedAt,
// @ts-ignore
                      id: PostModel.id
// @ts-ignore
                    }).from(PostModel).where(eq(PostModel.user, id)).orderBy(desc(PostModel.id)).limit(limit).offset(offset);
// @ts-ignore
                  }

                const result = await caller();
                update(id, limit, offset);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-2-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-3", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return (await db.select({
// @ts-ignore
                      title: PostModel.title,
// @ts-ignore
                      content: PostModel.content,
// @ts-ignore
                      createdAt: PostModel.createdAt,
// @ts-ignore
                      updatedAt: PostModel.updatedAt,
// @ts-ignore
                      id: PostModel.id,
// @ts-ignore
                      user: publicUserFields
// @ts-ignore
                    }).from(PostModel).where(eq(PostModel.id, id)).leftJoin(UserModel, eq(PostModel.user, UserModel.id)))[0];
// @ts-ignore
                  }

                const result = await caller();
                update(id);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-3-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-4", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, title, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return (await db.select().from(PostModel).where(eq(PostModel.title, title)))[0] != null;
// @ts-ignore
                  }

                const result = await caller();
                update(title);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-4-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-5", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, updates, id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db, dbEvent: dbEvent } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq, sql: sql } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const posts = await db.update(PostModel).set({ ...updates, updatedAt: sql`now()` }).where(eq(PostModel.id, id)).returning();
// @ts-ignore
                    dbEvent.emit("postUpdated", posts[0]);
// @ts-ignore
                  }

                const result = await caller();
                update(updates, id);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-5-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-6", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { sql: sql } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const [{ count }] = await db.select({ count: sql`count(*)` }).from(PostModel);
// @ts-ignore
                    return parseInt(count);
// @ts-ignore
                  }

                const result = await caller();
                update();
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-6-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-7", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq, sql: sql } = await import("drizzle-orm");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const [{ count }] = await db.select({ count: sql`count(*)` }).from(PostModel).where(eq(PostModel.user, id));
// @ts-ignore
                    return parseInt(count);
// @ts-ignore
                  }

                const result = await caller();
                update(id);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/posts/posts.ts-7-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("__internal_full_client_server_import__drizzle-orm?=,desc=desc,eq=eq", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => await import("drizzle-orm")

                const result = await caller();
                update();
                wsEvents.emit(`__internal_full_client_server_import__drizzle-orm?=,desc=desc,eq=eq-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-0", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, limit, offset, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { desc: desc } = await import("drizzle-orm");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return await db.select(publicUserFields).from(UserModel).orderBy(desc(UserModel.id)).limit(limit).offset(offset);
// @ts-ignore
                  }

                const result = await caller();
                update(limit, offset);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-0-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-1", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq } = await import("drizzle-orm");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return (await db.select(publicUserFields).from(UserModel).where(eq(UserModel.id, id)))[0];
// @ts-ignore
                  }

                const result = await caller();
                update(id);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-1-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-2", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, name, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq } = await import("drizzle-orm");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    return (await db.select(publicUserFields).from(UserModel).where(eq(UserModel.name, name)))[0];
// @ts-ignore
                  }

                const result = await caller();
                update(name);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-2-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-3", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, getUserByName, name, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const user = await getUserByName(name);
// @ts-ignore
                    return user != null;
// @ts-ignore
                  }

                const result = await caller();
                update(getUserByName, name);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-3-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-4", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, email, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq } = await import("drizzle-orm");
                const { UserModel: UserModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const user = (await db.select({ email: UserModel.email }).from(UserModel).where(eq(UserModel.email, email)))[0];
// @ts-ignore
                    return user != null;
// @ts-ignore
                  }

                const result = await caller();
                update(email);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-4-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-5", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, getUserByName, name, email, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const user = await getUserByName(name);
// @ts-ignore
                    return user?.email === email;
// @ts-ignore
                  }

                const result = await caller();
                update(getUserByName, name, email);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-5-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-6", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, id, maxPosts, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { desc: desc, eq: eq } = await import("drizzle-orm");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                const { PostModel: PostModel } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/Posts");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const users = await db.select({
// @ts-ignore
                      posts: PostModel,
// @ts-ignore
                      ...publicUserFields
// @ts-ignore
                    }).from(UserModel).where(eq(UserModel.id, id)).orderBy(desc(PostModel.id)).leftJoin(PostModel, eq(PostModel.user, UserModel.id)).limit(maxPosts);
// @ts-ignore
                    return users.reduce((acc, user) => {
// @ts-ignore
                      return { ...acc, posts: [...acc.posts, ...user.posts !== null ? [user.posts] : []] };
// @ts-ignore
                    }, { ...users[0], posts: [] });
// @ts-ignore
                  }

                const result = await caller();
                update(id, maxPosts);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-6-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-7", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id, user, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db, dbEvent: dbEvent } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const users = await db.insert(UserModel).values(user).returning(publicUserFields);
// @ts-ignore
                    dbEvent.emit("userCreated", users[0]);
// @ts-ignore
                    return users[0];
// @ts-ignore
                  }

                const result = await caller();
                update(user);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-7-${id}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        

            wsEvents.on("/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-8", /** 
            * @this CacheData
            * @param {string} str
            */ async function (str) {
                if(this.cache == null) return
                if(this.functionMap == null) return
                if(this.functionRef == null) return
                if(this.weakRef == null) return
                let [id1, updates, id, update] = deserialize(
                    str, 
                    "front", 
                    wsEvents,
                    this.cache,
                    this.functionMap,
                    this.functionRef,
                    this.weakRef
                );
                const { db: db, dbEvent: dbEvent } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db");
                const { eq: eq } = await import("drizzle-orm");
                const { UserModel: UserModel, publicUserFields: publicUserFields } = await import("/home/mav/repos/full-client-server-sveltekit-example/src/lib/db/shema/User");
                // @ts-ignore
                let caller = async () => {
// @ts-ignore
                    const users = await db.update(UserModel).set(updates).where(eq(UserModel.id, id)).returning(publicUserFields);
// @ts-ignore
                    dbEvent.emit("userUpdated", users[0]);
// @ts-ignore
                    return users[0];
// @ts-ignore
                  }

                const result = await caller();
                update(updates, id);
                wsEvents.emit(`/home/mav/repos/full-client-server-sveltekit-example/src/lib/user/User.ts-8-${id1}`, serialize(
                    result, 
                    "back", 
                    wsEvents,
                    this.cache,
                    this.functionRef,
                    this.functionMap,
                    this.weakRef
                ));
            }.bind(data));
        
            cb(wsEvents);
    
        })
    }
    
};
