<!-- PROJECT PAGE -->
<script>
	// Importing site config
	import { config } from '../../site.config';

	// Get post data
	export let data;
	let { post } = data;

	let title = post.metadata.title;
	let year = post.metadata.year;
	let slug = post.metadata.slug;
	let type = post.metadata.type;
	let link = post.metadata.link;

	let visible = true;

	let images = [];
	let filteredImages = [];
	// const imageModules = import.meta.glob("./images/**/*.{jpg,jpeg,png,gif,webp}");
	const imageModules = import.meta.glob('/static/images/**/*.{jpg,jpeg,png,gif,webp,webm}', {
		eager: true
	});

	const loadImageData = async (modulePath) => {
		const imageName = modulePath.split('/').pop().split('.')[0]; // Extract the filename without extension
		const altText = imageName.replace(/_/g, ' '); // Replace underscores with spaces
		// const { default: imageUrl } = await imageModules[modulePath]();
		return { src: modulePath, alt: altText };
	};

	Promise.all(Object.keys(imageModules).map(loadImageData))
		.then((loadedImages) => {
			images = loadedImages;
			filteredImages = images.filter((img) => img.src.includes(slug));
			// console.log(filteredImages);
		})
		.catch((error) => {
			console.error('Error loading images:', error);
		});

	function toggleVisible() {
		visible = !visible;
	}
</script>

<svelte:head>
	<!-- Shorthand for - If the post exists, return the string, else return 404 -->
	<title>{post ? `${post.metadata.title} | ${config.title}` : '404'}</title>
</svelte:head>

<section />
<!-- PROJECT -->
<section class="col-start-4 text-white md:text-black md:col-start-5 md:col-span-2 z-20">
	<div class="fixed top-1/2">
		<h2>{title}</h2>
	</div>
</section>

<!-- DESCRIPTION -->
<section class="hidden md:grid md:col-start-5 row-start-6 z-20">
	<div class="fixed md:bottom-0 w-[20ch] text-black mb-4">
		{#if link}<a href={link} class="text-sm hover:blur-sm">Online →</a>{/if}
		{#if year && type}<p class="mb-0">{year} * {type}</p>{/if}
	</div>
</section>

<section
	class="col-start-1 col-end-6 row-start-1 text-white md:text-black md:col-start-1 md:col-span-4 md:row-start-6 justify-end z-30"
>
	<div class="fixed bottom-0 md:w-[32ch] lg:w-[44ch]">
		<button on:click={toggleVisible} class="block text-left text-sm my-4 hover:blur-sm">
			{visible ? 'Info -' : 'Info +'}
		</button>
		{#if visible}
			<div class="hidden md:block">
				<svelte:component this={post.default} />
			</div>

			<div
				class="md:hidden fixed top-0 left-0 w-lvw h-screen bg-white/30 text-black z-30 p-4 backdrop-blur-xl"
			>
				<!-- PROJECT INFO BUTTON -->
				<button on:click={toggleVisible} class="block text-left text-sm my-4 hover:blur-sm">
					{visible ? 'Info -' : 'Info +'}
				</button>
				<!-- PROJECT INFO -->
				<svelte:component this={post.default} />

				<div class="fixed bottom-0 text-black mb-4 z-20">
					{#if link}<a href={link} class="text-sm hover:blur-sm">Online →</a>{/if}
					{#if year && type}<p class="mb-0">{year} * {type}</p>{/if}
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- IMAGES -->
<!-- <div class="absolute md:grid md:col-start-7 md:col-span-6">
	{#if filteredImages.length > 0}
		{#each filteredImages as { src, alt }, index}
			<div class="mt-0 w-screen md:w-full">
				<img class="flex items-start object-cover" src={src.replace(/^\/static/, '')} {alt} />
			</div>
		{/each}
	{:else}
		<p>No images to display</p>
	{/if}
</div> -->
