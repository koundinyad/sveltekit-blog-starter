<script>
	// Getting the site config
	import { config } from '../site.config';

	// Importing the global css
	import '../global.css';
</script>

<svelte:head>
	<title>{config.title}</title>
	<meta name="description" content={config.description} />
</svelte:head>

<div id="title">
	<h1><a href="/">{config.title}</a></h1>
</div>

<slot />
