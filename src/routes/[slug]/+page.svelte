<script>
	// Importing site config
	import { config } from '../../site.config';

	export let data;
	let { post } = data;
</script>

<svelte:head>
	<!-- Shorthand for - If the post exists, return the string, else return 404 -->
	<title>{post ? `${post.metadata.title} | ${config.title}` : '404'}</title>
</svelte:head>

<div class="post-content">
	<svelte:component this={post.default} />
</div>
