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

<!-- DOTS -->
<div class="fixed flex top-1 left-0 p-2 flex-row w-full md:w-auto md:top-0 md:left-0  md:flex-col md:h-full justify-between z-[10]">
	<div class="relative w-[20px] h-[20px]">
		<svg class="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10" cy="10" r="5" />
		</svg>
	</div>
	<div class="relative w-[20px] h-[20px]">
		<svg class="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10" cy="10" r="5" />
		</svg>
	</div>
	<div class="relative w-[20px] h-[20px]">
		<svg class="w-[20px] h-[20px]" xmlns="http://www.w3.org/2000/svg">
			<circle cx="10" cy="10" r="5" />
		</svg>
	</div>
</div>

<div id="container" class="h-screen max-w-[1440px] self-center m-auto">
	<slot></slot>
</div>




