
<script lang="ts">
    import { offPostAdded, offPostChange, onPostAdded, onPostChange } from "$lib";
    import { getAllPosts } from "$lib/posts/posts";
    import { onMount } from "svelte";
    import type { Post } from "$lib/db/shema/Posts.js";
    import { slide } from "svelte/transition";
    export let data
    async function getMorePosts() {
        data.posts.push(...await getAllPosts(4, data.posts.length));
        data = data
    }
    const postAddedCB = (newPost: import("$lib/db/shema/Posts.js").Post) => {
        data.posts = [newPost, ...data.posts]
    }
    const postChangeCB = (updatedPost: import("$lib/db/shema/Posts.js").Post) => {
        let postIndex = data.posts.findIndex((post: Post) => post.id === updatedPost.id)
        if(postIndex < 0) return
        data.posts[postIndex] = updatedPost
    }
    onMount(() => {
        onPostAdded(postAddedCB)
        onPostChange(postChangeCB)
        return () => {
            offPostAdded(postAddedCB)
            offPostChange(postChangeCB)
        }
    })
    let js = false
    onMount(() => {
        js = true
    })
</script>
{#each data?.posts as post (post.id)}
    <div class="crd" transition:slide>
        <a 
            href={`/posts/view/${post.id}`}
            style:display="block"
        >
            <div>
                <h3>{post.title}</h3>
            </div>
            <p>{post.createdAt}</p>
        </a>
    </div>
{/each}
{#if data.posts.length < data.count && js}
    <button 
        on:click={getMorePosts}
        style:display="block"
        transition:slide
    >show more</button>
{/if}
{#if data.posts.length > 4 && js}
    <button 
        on:click={() => data.posts = data.posts.slice(0, -4)}
        style:display="block"
        transition:slide
    >show less</button>
{/if}
{#if !js}
    <a href="./view-all/0">show all</a>
{/if}

<a href="/">go to home</a>
