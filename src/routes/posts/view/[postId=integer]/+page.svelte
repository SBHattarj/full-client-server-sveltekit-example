<script lang="ts">
    import { onMount } from 'svelte';
    import { onPostChange, offPostChange } from '$lib'
    import type { Post } from '$lib/db/shema/Posts.js';
    import type { User } from '$lib/db/shema/User.js';
    import { getUserById } from '$lib/user/User.js';

    export let data
    async function onPostChangeCB(e: Post) {
        if(e.id !== data.id) return
        data.post = { ...e, user: await getUserById(e.user) }

    }
    onMount(() => {
        onPostChange(onPostChangeCB)
        return () => {
            offPostChange(onPostChangeCB)
        }
    })
</script>

<p>created at {data.post.createdAt}</p>
<h1>{data.post.title}</h1>
<p>created by <a href={`/users/${data.post.user?.id}`}>{data.post.user?.name}</a></p>
<p>{data.post.content}</p>
{#if data.post.user?.id === data.id}
    <a href="/posts/edit/{data.post.id}">edit</a>
{/if}
<br>
<a href="/">go to home</a>
