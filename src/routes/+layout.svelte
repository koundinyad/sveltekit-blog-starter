<!-- HOME LAYOUT -->
<script>
	// Getting the site config
	import { config } from '../site.config';
	// Importing the global css
	import '../global.css';
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	import Nav from "$lib/components/Nav.svelte";

	let isHomePage = false; // Default value

	// Check url as soon as pages update
	afterUpdate(() => {
		isHomePage = $page.url.pathname === '/';
		console.log(isHomePage);
	});

</script>

<svelte:head>
	<title>{config.title}</title>
	<meta name="description" content={config.description} />
</svelte:head>

<div id="container" class="absolute px-4 py-0 h-screen w-full">
	<div class="grid gap-x-8 h-screen md:grid-cols-12 md:grid-rows-6 relative">
		<!-- TITLE -->
		<section class="z-50">
			<h1 class="fixed top-1/2 text-sm" class:text-black={!isHomePage}>
				<a href="/">April Chu</a>
			</h1>
		</section>

		<!-- MENU -->
		<section class="col-start-4 z-50">
			<div class="fixed top-1/2 text-sm text-white" class:text-black={!isHomePage} class:text-white={isHomePage}>
				<nav>
					<Nav />
				</nav>
			</div>

		</section>

	</div>
</div>

<slot />
