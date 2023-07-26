<script>
    export let data
</script>
<h1>Own Posts</h1>
{#each data?.myPosts as post (post.id)}
    <div class="crd">
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
<a href="./view-own/4">next</a>
<a href="/">go to home</a>
