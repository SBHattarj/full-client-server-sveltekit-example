<script>
    import { enhance } from '$app/forms';
    export let data
</script>
<h1>Editing {data.title}</h1>
<form method="POST" use:enhance>
    <label for="content">content</label>
    <textarea 
        name="content" 
        id="content" 
        cols="30"
        rows="10"
        style:display="block"
        required
    ></textarea>
    <button type="submit">update</button>
</form>
<a href="/">go to home</a>
