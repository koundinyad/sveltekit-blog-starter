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

<div id="container" class="absolute px-4 py-6 md:px-8 md:py-0 h-screen w-full">
	<div class="grid gap-4 md:grid-cols-12 z-50">
		<!-- TITLE -->
		<section>
			<h1 class="fixed top-2/4 text-sm mb-2 md:mb-6">
				<a href="/">April Chu</a>
			</h1>
		</section>

		<!-- MENU -->
		<section class="col-start-4">
			<h2 class="fixed top-2/4 text-sm mb-2 md:mb-6">Work</h2>
		</section>

	</div>
</div>

<slot />
