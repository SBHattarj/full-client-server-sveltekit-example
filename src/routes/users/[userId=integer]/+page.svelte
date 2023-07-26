<script lang="ts">
    import { offPostAdded, offPostChange, onPostAdded, onPostChangeByUser } from '$lib';
    import type { Post } from '$lib/db/shema/Posts.js';
    import { getAllPostsFromUser } from '$lib/posts/posts';
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';

    export let data;
    async function showMorePosts() {
        const newPosts = await getAllPostsFromUser(data.id, 4, data.posts.length);
        
        data.posts.push(...newPosts.map(post => ({...post, user: data.id})));
        data = data;
    }
    function showLessPosts() {
        data.posts = data.posts.slice(0, -4);
    }
    function postAddedCB(newPost: import("$lib/db/shema/Posts.js").Post) {
        data.posts = [newPost, ...data.posts];
    }
    function postChangeCB(updatedPost: import("$lib/db/shema/Posts.js").Post) {
        let postIndex = data.posts.findIndex((post: Post) => post.id === updatedPost.id);
        if(postIndex < 0) return;
        data.posts[postIndex] = updatedPost;
    }
    let js = false
    onMount(() => {
        js = true
        onPostAdded(postAddedCB);
        onPostChangeByUser(data.id, postChangeCB);
        return () => {
            offPostAdded(postAddedCB);
            offPostChange(postChangeCB);
        }
    })
</script>

<h1>User: {data.name}</h1>
<h3>Email: {data.email}</h3>

{#each data.posts as post (post.id)}
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
{#if data.postCount > data.posts.length && js}
    <button 
        on:click={showMorePosts}
        style:display="block"
        transition:slide
    >show more</button>
{/if}
{#if data.posts.length >= data.postCount && js}
    <button 
        on:click={showLessPosts}
        style:display="block"
        transition:slide
    >show less</button>
{/if}
{#if !js}
    <a href={`./${data.id}/4`}>show all</a>
{/if}
<a href="/">go to home</a>
