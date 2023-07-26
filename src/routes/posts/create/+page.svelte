<script lang="ts">
    import { enhance } from '$app/forms';
    import { slide } from 'svelte/transition';
    import { postExists } from "$lib/posts/posts"

    export let form;
    let title = '';
    let content = '';
</script>
<form method="POST" use:enhance>
    {#if form?.__error}
        <p transition:slide>{form.__error}</p>
    {/if}
    <div>
        <label for="title">title</label>
        <input 
            name="title"
            type="text"
            required
            bind:value={title}
            on:focus={async e => {
                delete form?.title
            }}
            on:blur={async e => {
                if(await postExists(title)){
                    if(form == null){
                        form = {
                            title: "already exists"
                        }
                        return
                    }
                    form.title = "already exists"
                    return
                }
                if(title == "") {
                    if(form == null) {
                        form = {
                            title: "required"
                        }
                        return
                    }
                    form.title = "required"
                    return
                }
                delete form?.title
            }}
        >
        {#if form?.title}
            <p transition:slide>{form.title}</p>
        {/if}
    </div>
    <div>
        <label for="content">content</label>
        <textarea 
            name="content" 
            cols="30"
            rows="10"
            style:display="block"
            bind:value={content}
            on:focus={async e => {
                delete form?.content
            }}
            on:blur={() => {

                if(content == "") {
                    if(form == null) {
                        form = {
                            content: "required"
                        }
                        return
                    }
                    form.content = "required"
                    return
                }
                delete form?.content
            }}
            required
        ></textarea>
        {#if form?.content}
            <p transition:slide>{form.content}</p>
        {/if}
    </div>
    <button type="submit">create</button>
</form>
<a href="/">go to home</a>
