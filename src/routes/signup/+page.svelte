<script lang="ts">
    import { enhance } from '$app/forms';
    import { userExists, emailExists } from '$lib/user/User.js';
    import { slide } from 'svelte/transition';

    export let form;
    let name = '';
    let email = '';
    let password = '';
    let confirmPassword = '';
</script>

<form method="POST" use:enhance>
    {#if form?.__error}
        <p transition:slide>{form.__error}</p>
    {/if}
    <div>
        <label for="name">name</label>
        <input 
            required
            name="name" 
            type="text"
            bind:value={name}
            on:focus={async () => {
                delete form?.name
            }}
            on:blur={async () => {
                if(await userExists(name)){
                    if(form == null){
                        form = {
                            name: "already exists"
                        }
                        return
                    }
                    form.name = "already exists"
                    return
                }
                delete form?.name
            }}
        >
        {#if form?.name}
            <p transition:slide>{form.name}</p>
        {/if}
    </div>
    <div>
        <label for="email">email</label>
        <input 
            required 
            name="email" 
            type="email"
            bind:value={email}
            on:focus={async () => {
                delete form?.email
            }}
            on:blur={async () => {
                if(await emailExists(email)){
                    if(form == null){
                        form = {
                            email: "already exists"
                        }
                        return
                    }
                    form.email = "already exists"
                    return
                }
                delete form?.email
            }}
        >

        {#if form?.email}
            <p transition:slide>{form.email}</p>
        {/if}
    </div>
    <div>
        <label for="password">password</label>
        <input 
            required
            name="password"
            type="password"
            bind:value={password}
        >
    </div>
    <div>
        <label for="confirmPassword">confirm password</label>
        <input
            required 
            name="confirmPassword" 
            type="password"

            bind:value={confirmPassword}
            on:focus={async () => {
                delete form?.confirmPassword
            }}
            on:blur={async () => {
                if(confirmPassword != password){
                    if(form == null){
                        form = {
                            confirmPassword: "passwords do not match"
                        }
                        return
                    }
                    form.confirmPassword = "passwords do not match"
                    return
                }
                delete form?.confirmPassword
            }}
        >
        {#if form?.confirmPassword}
            <p transition:slide>{form.confirmPassword}</p>
        {/if}
    </div>
    <button type="submit">signup</button>
</form>
