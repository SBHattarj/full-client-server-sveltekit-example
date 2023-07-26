<script lang="ts">
    import { slide } from 'svelte/transition';
    import { enhance } from '$app/forms';
    import { userExists, userEmailMatch } from "$lib/user/User";

    export let form
    let name = ''
    let email = ''
    let password = ''
    $: console.log(form)
</script>

<form method="POST" use:enhance>
{#if form?.__form}
    <p transition:slide>{form.__form}</p>
{/if}
<div>
    <label for="name">name</label>
    <input 
        bind:value={name} 
        required 
        name="name" 
        type="text" 
        on:focus={async e => {
            delete form?.name
        }}
        on:blur={async e => {
            if(!await userExists(name)){
                if(form == null) {
                    form = {
                        name: "not found"
                    }
                    return
                }
                form.name = "not found"
                return
            }
            delete form?.name
        }}
    />
    {#if form?.name}
        <p transition:slide>{form.name}</p>
    {/if}
</div>
<div>
    <label for="email">email</label>
    <input 
        required 
        name="email" 
        type="text" 
        bind:value={email}

        on:focus={async e => {
            delete form?.email
        }}
        on:blur={async () => {
            if(!await userEmailMatch(name, email)){
                if(form == null) {
                    form = {
                        email: "email doesn't match with name"
                    }
                    return
                }
                form.email = "email doesn't match with name"
                return
            }
            delete form?.email
        }}
    />
    {#if form?.email}
        <p transition:slide>{form.email}</p>
    {/if}
</div>
<div>
    <label for="password">password</label>
    <input 
        type="password" 
        required 
        name="password" 
        bind:value={password}
        on:focus={async e => {
            delete form?.password
        }}
    >
    {#if form?.password}
        <p transition:slide>{form.password}</p>
    {/if}
</div>
<button type="submit">login</button>
</form>

<p>Don't have an acount? <a href="/signup">register!</a></p>
