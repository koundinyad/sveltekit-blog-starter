<script>

	// Importing site config
	import { config } from '../../site.config';

	export let data;
	let { post } = data;

</script>

<svelte:head>
	<title>{post ? `${post.metadata.title} | ${config.title}` : '404'}</title>
</svelte:head>

<div class="post-content">
	<svelte:component this={post.default} />
</div>