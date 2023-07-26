<script>
    export let data
</script>
{#each data?.posts as post (post.id)}
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
{#if data.posts.length + data.offset < data.count}
    <a href={`./${data.offset + 4}`}>next</a>
{/if}
{#if data.offset > 0}
    <a href={`./${data.offset < 4 ? 0 : data.offset - 4}`}>prev</a>
{/if}
<a href="/">go to home</a>
