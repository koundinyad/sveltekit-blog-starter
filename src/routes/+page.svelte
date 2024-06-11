<!-- HOME -->
<script>
	import { writable } from 'svelte/store';
	import Carousel from '$lib/components/Carousel.svelte';

	// Initiate array for all project images
	let images = [];
	// Initiate array for filtered project images
	let filteredImages = [];

	// Array of colors
	const colors = ['#CAC444', '#ED7BA1', '#ED4005', '#91CBDA'];

	// Function to get a random color
	function getRandomColor() {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	// Function to get the next color in the array
	function getNextColor() {
		const color = colors[colorIndex];
		// Increment colorIndex and reset to 0 if exceeds array length
		colorIndex = (colorIndex + 1) % colors.length;
		return color;
	}

	// Initialize $allProjects as an empty array
	let allProjects = writable([]);

	// Get all the markdown files in the projects folder (these are my projects)
	const projectModules = import.meta.glob('../projects/*.md', { eager: true });
	// Get the values of the project modules
	const projects = Object.values(projectModules);
	// Import all project images
	const projectImages = import.meta.glob('/static/images/**/*.{jpg,jpeg,png,gif,webp,webm}', {
		eager: true
	});

	// FUNCTION
	// Takes a module path and returns an image's src and alt text
	// Called in getImages function
	const loadImageData = async (modulePath) => {
		const imageName = modulePath.split('/').pop().split('.')[0]; // Extract the filename without extension
		const altText = imageName.replace(/_/g, ' '); // Replace underscores with spaces
		return { src: modulePath, alt: altText };
	};

	// FUNCTION
	// Takes a project slug & returns an array of images of that project
	function getImages(slug) {
		// For each key in project images, call the loadImageData function
		// Promise.all([...]) takes the array of promises returned by map and returns a single promise that resolves when all the promises in the array have resolved
		return (
			Promise.all(Object.keys(projectImages).map(loadImageData))
				//  When the promise resolves, the then method will be called with the resolved value, which is an array of loaded images
				.then((loadedImages) => {
					// Assigns the array of loaded images to a variable named images
					images = loadedImages;
					// Filter images to only include images with an src property that includes the slug string
					filteredImages = images.filter((img) => img.src.includes(slug));
					// Returns the filteredImages array as the result of the then method's callback
					return filteredImages;
				})
				// Catch method will be called if any of the promises in the chain are rejected
				.catch((error) => {
					console.error('Error loading images:', error);
					throw error;
				})
		);
	}

	(async () => {
		// Use a for...of loop to iterate over the projects array
		for (const p of projects) {
			try {
				// Await the asynchronous operation to get images
				const images = await getImages(p.metadata.slug);
				// Filter the images based on the project's slug
				const filteredImages = images.filter((img) => img.src.includes(p.metadata.slug));
				// Update the $allProjects array with the new project object
				$allProjects = [
					{ metadata: p.metadata, default: p.default, images: filteredImages },
					...$allProjects
				];
			} catch (error) {
				console.error('Error loading images:', error);
			}
		}
		// Log the final $allProjects array
		// console.log($allProjects);
	})();
</script>

<!-- FEATURED PROJECTS -->
<section class="grid_template" id="featured-work">
	<!-- section title -->
	<h4 class="md:col-start-5 col-span-2 text-gray mb-2 col-start-2">Featured Projects</h4>
	<!-- project block -->
	{#each $allProjects as project}
		{#if project.metadata.featured === 'yes'}
			<!-- project title -->
			<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6">
				<div class="flex flex-row justify-between items-end">
					<p class="text-xl mb-0">
						{project.metadata.title}<sup class="text-gray text-sm"
							>{project.metadata.type} ({project.metadata.year})</sup
						>
					</p>
					{#if project.metadata.link}
						<a
							href={project.metadata.link}
							target="_blank"
							class="text-sm px-2 py-1 rounded text-white"
							style="background-color: {getRandomColor()};">Visit ↗</a
						>
					{/if}
				</div>
			</div>
			<!-- image carousel -->
			<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6 md:mb-12">
				<Carousel images={project.images}>
					<!-- {#if project.images.length > 0}
						{#each project.images as { src, alt }}
							<div class="embla__slide flex-none w-full h-[420px]">
								<img class="object-cover w-full h-[420px]" src={src.replace(/^\/static/, '')} {alt} />
							</div>
						{/each}
					{:else}
						<p>No images to display</p>
					{/if} -->
				</Carousel>
			</div>
			<!-- project details -->
			<div class="md:col-start-10 md:col-span-2 col-start-2 col-span-5 mb-8 md:mb-0">
				<svelte:component this={project.default} />
			</div>
		{/if}
	{/each}
</section>

<!-- WORK -->
<section class="grid_template md:mt-12" id="work">
	<!-- section title -->
	<h4 class="md:col-start-5 text-gray mb-2 col-start-2 col-span-2">Work</h4>
	<!-- project block -->
	<div class="md:col-start-4 md:col-span-3 col-start-1 col-span-3">
		<div class="flex gap-4">
			{#each $allProjects as project}
				{#if project.metadata.featured === 'no'}
					<div class="flex-1">
						<div class="flex flex-col">
							<!-- project title -->
							<p class="mb-2">
								{project.metadata.title}<sup class="text-gray hidden md:inline-block"
									>{project.metadata.type} ({project.metadata.year})</sup
								>
							</p>
							<!-- project details -->
							<p class="block md:hidden text-gray mb-0">
								{project.metadata.type} ({project.metadata.year})
							</p>
							<!-- project images -->
							<div class="my-2">
								<Carousel images={project.images}>
									<!-- {#if project.images.length > 0}
									{#each project.images as { src, alt }}
										<div class="embla__slide flex-none w-full h-[200px]">
											<img class="object-cover w-full h-[200px]" src={src.replace(/^\/static/, '')} {alt} />
										</div>
									{/each}
								{:else}
									<p>No images to display</p>
								{/if} -->
								</Carousel>
							</div>
							<!-- project details -->
							<svelte:component this={project.default} />
							{#if project.metadata.link}
								<a
									href={project.metadata.link}
									target="_blank"
									class="text-sm px-2 py-1 rounded text-white"
									style="background-color: {getRandomColor()};">Visit ↗</a
								>
							{/if}
						</div>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</section>
