<script lang="ts">
    console.log("hello")
    import { offPostChange, onPostAdded, offPostAdded} from "$lib"
    import { onMount } from "svelte";
    import { getCookieStore } from "$lib/cookie"
    import { enhance } from "$app/forms";
    import { get } from "svelte/store";
    import { slide } from "svelte/transition";
    import type { Post } from "$lib/db/shema/Posts.js";
    import { countPosts, countPostsFromUser, getAllPostsFromUser } from "$lib/posts/posts";
    import { emailExists } from "$lib/user/User";
    import { sessionStore as session } from "$lib/session-browser.js";
    export let data;
    let cookieStore = getCookieStore();
    function postChangeCB(e: Post) {
        const id = data.myPosts.findIndex((post) => post.id === e.id)
        if(id !== -1) {
            data.myPosts[id] = e
            data = data
        }
    }
    async function postAddCB(postAdded: Post) {
        const count = await countPosts()
        const myPostCount = await countPostsFromUser($session?.userId!)
        data.myPostCounts = myPostCount
        data.extraPosts = count - myPostCount
        if(postAdded.user === $session?.userId) {
            data.myPosts = [postAdded, ...data.myPosts]
        }
    }
    console.log("hello")
    let js = false
    onMount(() => {
        js = true
        console.log(js)
        onPostAdded(postAddCB)
        return () => {
            $session?.destroy()
            offPostChange(postChangeCB)
            offPostAdded(postAddCB)
        }
    })
    $: (async () => {
        console.log(session)
        await (await get(session)?.setCookies($cookieStore))?.loadUserData()
    })()
    export let form
    let updateEmail = ''
    $: if(!data.updateEmail) updateEmail = $session?.userData?.email ?? updateEmail
</script>
<header>
    <form method="POST" action="/?/logout" use:enhance>
        <button type="submit">logout</button>
    </form>
    <h1>Home</h1>
</header>
<main>
    <section>
        <h2>Welcome {$session?.userData?.name ?? data.userData?.name}</h2>
        {#if !data.updateEmail}
            <div class="crd" transition:slide>
                <h4>Email: {$session?.userData?.email ?? data.userData?.email}</h4>
                {#if js}
                    <button on:click={() => {data.updateEmail = true}}>update email</button>
                {:else}
                    <a href="/?updateEmail=true">update email</a>
                {/if}
            </div>
        {:else}
            <div transition:slide>
                <form action="/?/updateEmail" method="POST" use:enhance>
                    <div>
                        <label for="email">email</label>
                        <input 
                            type="email" 
                            id="email"
                            name="email" 
                            required
                            bind:value={updateEmail}
                            on:blur={async () => {
                                if(await emailExists(updateEmail) && updateEmail !== ($session?.userData?.email ?? data.userData?.email)) {
                                    if(form == null) {
                                        form = {
                                            email: "already taken"
                                        }
                                    }
                                    form.email = "already taken"
                                }
                            }}
                            on:focus={() => {
                                delete form?.email
                            }}
                        >
                        {#if form?.email}
                            <p transition:slide>{form.email}</p>
                        {/if}
                    </div>
                    
                    <button>update email</button>
                </form>

                {#if js}
                    <button on:click={() => {data.updateEmail = false}}>cancel</button>
                {:else}
                    <a href="/">cancel</a>
                {/if}
            </div>
        {/if}
    </section>
    <section>
        <h3>Posts</h3>
        <h4>Your Posts</h4>
        <div>
            {#each data.myPosts as post (post.id)}
                <a 
                    href={`/posts/view/${post.id}`}
                    style:display="block"
                    transition:slide
                    class="crd"
                >
                    <div>
                        <h4>{post.title}</h4>
                    </div>
                    <p>{post.createdAt}</p>
                </a>
            {/each}
            {#if data.myPosts.length > 4}
                <button 
                    on:click={() => {
                        data.myPosts = data.myPosts.slice(0, -4)
                        data = data
                    }}
                    style:display="block"
                    transition:slide
                >Show less</button>
            {/if}
            {#if data.myPosts.length < data.myPostCounts}
                <button 
                    on:click={async () => {
                        if($session == null || $session?.userId == null) return
                        const posts = await getAllPostsFromUser(
                            $session.userId, 
                            4, 
                            data.myPosts.length
                        )
                        data.myPosts.push(...posts)
                        data = data
                    }}
                    style:display="block"
                    transition:slide
                >Show more</button>
            {/if}
            {#if !js}
                <a href={`/posts/view-own`}>view all</a>
            {/if}
        </div>
        <a href="/posts/create">Create new Posts</a>
        <p>total posts {data.myPostCounts}</p>
    </section>
    <section>
        <a href="/posts/view-all"><h3>Check {data.extraPosts} other posts</h3></a>
    </section>
</main>

