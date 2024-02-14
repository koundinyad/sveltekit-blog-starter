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
	let isAboutPage = false;

	// Check url as soon as pages update
	afterUpdate(() => {
		isHomePage = $page.url.pathname === '/';
		isAboutPage = $page.url.pathname === '/about';
	});

</script>

<svelte:head>
	<title>{config.title}</title>
	<meta name="description" content={config.description} />
</svelte:head>

<div id="container" class="absolute h-screen w-full">
	<div class="grid gap-x-8 grid-cols-4  md:grid-cols-12 md:grid-rows-6 h-screen px-4 relative">
		<!-- TITLE -->
		<section class="col-start-1 z-50">
			<h1 class="fixed top-1/2 md:text-black {isAboutPage ? 'text-black' : 'text-white'}">
				<a href="/" class="hover:blur-sm">April Chu</a>
			</h1>
		</section>

		<!-- MENU -->
		<section class="col-start-2 md:col-start-3 z-50">
			<div class="fixed top-1/2 {isAboutPage ? 'text-black' : 'text-white'} { !isHomePage ? 'md:text-black' : '' }" >
				<nav>
					<Nav />
				</nav>
			</div>
		</section>
		<slot />
	</div>
</div>




