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

<div id="container" class="h-screen w-full">
	<div class="flex flex-col md:mx-12 mx-4">
		<!-- TITLE & MENU -->
		<section class="grid_template mt-4 gap-0">
			<h1 class="md:col-start-4 md:col-span-3 col-start-1 col-span-6 mb-2">
				April Chu<sup class="text-gray">Design & Code</sup>
			</h1>

			<div class="md:col-end-10 md:col-span-3 col-start-1 col-span-6" >
				<nav>
					<Nav />
				</nav>
			</div>
		</section>

		<!-- ABOUT -->
		<section class="grid_template" id="about">
			<h4 class="md:col-start-5 col-start-2 text-gray mb-2">About</h4>
			<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6">
				<p class="text-xl">
					April Chu is designer that works with code. With roots in web and brand, her practice is supplemented by research into alternative Internet & media cultures<sup>01</sup>. Currently based in London by way of Taipei and California. She holds a master’s from the Creative Computing Institute (UAL) and a bachelor’s from Wellesley College.
				</p>
			</div>
			<div class="md:col-start-10 md:col-span-2 col-start-4 col-span-3 md:py-4">
				<p>
					<sup>01</sup>Currently building an online radio. You can read about it here ***
				</p>
			</div>
		</section>

		<!-- PROJECTS pulling from +page.svelte -->
		<slot />

		<!-- CONTACT & COLOPHON-->
		<section class="grid_template" id="contact">
			<!-- contact -->
			<h4 class="md:col-start-5 md:col-span-2 text-gray md:row-start-1 col-start-2">Contact</h4>
			<div class="md:col-start-4 md:col-span-3 col-start-1 col-span-6">
				<p>
					Happy to talk about projects or life. Currently open for freelance work.
				</p>
				<div>
					<a href="mailto:hi@april.wiki" class="hover:blur-sm text-xl">hi@april.wiki</a>
				</div>
				<div class="flex justify-between">
					<a href="https://read.cv/aprlc" class="hover:blur-sm text-xl">(read.cv)</a>
					<a href="https://www.are.na/april-c" class="hover:blur-sm text-xl">(are.na)</a>
					<a href="https://read.cv/aprlc" class="hover:blur-sm text-xl">(insta)</a>
				</div>
			</div>
			<!-- colophon -->
			<h4 class="md:col-start-8 md:col-span-2 text-gray md:row-start-1 col-start-2 mt-12 md:mt-0">Colophon</h4>
			<div class="md:col-start-7 md:col-span-3 col-start-1 col-span-6">
			<p>
				This website is hand-coded and maintained by myself. Built with SvelteKit. Type is set in Fluxish by OSP Foundry.
				<br><br>
				Last updated on June 3, 2024 with love. Thank you for visiting!
			</p>
			</div>
		</section>

		<!-- FOOTER -->
		<section class="grid_template">
			<p class="md:col-start-4 md:col-span-6 text-7xl tracking-tighter text-center">END OF MARCH</p>
		</section>

	</div>
</div>




