<script>
	// Getting the page parameters
	import { page } from '$app/stores';

	// Importing site config
	import { config } from '../../site.config';

	// Importing the posts from the posts folder and parsing them
	const postsModules = import.meta.glob('../../posts/*.md', { eager: true });

	let posts = Object.values(postsModules);

	// Filtering for current post item
	const post = posts.filter((post) => post.metadata.slug === $page.params.slug)[0];
</script>

<svelte:head>
	<!-- Shorthand for - If the post exists, return the string, else return 404 -->
	<title>{post ? `${post.metadata.title} | ${config.title}` : '404'}</title>
</svelte:head>

{#if !post}
	<p>Post not found</p>
{:else}
	<div class="post-content">
		<svelte:component this={post.default} />
	</div>
{/if}
