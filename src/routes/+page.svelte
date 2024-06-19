<!-- HOME -->
<script>
	import { writable } from 'svelte/store';
	import News from '$lib/components/News.svelte';
	import Nav from "$lib/components/Nav.svelte";
	import CarouselSingle from '$lib/components/CarouselSingle.svelte';
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
		console.log($allProjects);
	})();
</script>

<!-- News popup -->
<div class="absolute">
	<News />
</div>

<div class="flex flex-col md:mx-4 mx-4">
	<!-- TITLE & MENU -->
	<section class="grid_template mt-12 md:mt-4 justify-end">
		<p class="md:col-start-3 md:col-span-3 col-start-1 col-span-2 mb-0">
			April Chu
		</p>
		<!-- <div class="md:col-end-10 md:col-span-3 col-start-3 col-span-6 place-self-end" >
			<Nav />
		</div> -->
		<div class="md:col-start-7 md:col-span-4 col-start-2 col-span-5">
			<p>
				April is designer that works with code. With roots in web and brand, her practice is supplemented by research into alternative Internet & media cultures<sup>01</sup>. Based in London by way of Taipei and California. She holds a master’s from the Creative Computing Institute (UAL) and a bachelor’s from Wellesley College.
			</p>
			<div>
				<p class="mb-0 text-gray">Find me elsewhere. Currently open for opportunities.</p>
				<a href="mailto:hi@april.wiki" class="hover:link-hover text-sm">hi@april.wiki,&nbsp;</a>
				<a href="https://read.cv/aprlc" class="hover:link-hover text-sm">read.cv,&nbsp;</a>
				<a href="https://www.are.na/april-c" class="hover:link-hover text-sm"> are.na,&nbsp;</a>
				<a href="https://read.cv/aprlc" class="hover:link-hover text-sm">insta</a>
			</div>
		</div>
		<div class="md:col-start-10 md:col-span-2 col-start-4 col-span-3">
			<p class="text-xs leading-3">
				<sup>01</sup>
				Currently building an online radio. You can read about it here.
			</p>
		</div>
	</section>

	<!-- FEATURED PROJECTS -->
	<section class="grid_template" id="featured-work">
		<!-- section title -->
		<!-- <h4 class="md:col-start-2 col-span-4 text-gray mb-4 col-start-2">Featured Work</h4> -->
		<!-- project block -->
		{#each $allProjects as project}
			{#if project.metadata.featured === 'yes'}
				<div class="md:col-start-3 md:col-span-3 col-start-1 col-span-6">
					<div class="flex flex-col">
						<div class="flex flex-row gap-2 content-end">
							<!-- project title -->
							<p class="mb-0">
								{project.metadata.title}
							</p>
							<!-- project link -->
							{#if project.metadata.link}
								<a
									href={project.metadata.link}
									target="_blank"
									class="text-[0.5rem] px-[0.25rem] border border-black rounded-full ml-1 hover:link-hover" >Visit ↗</a>
							{/if}
						</div>
						<!-- project details -->
						<p class="mb-2 text-gray">{project.metadata.type} ({project.metadata.year})</p>
					</div>
				</div>
					<!-- project blurb -->
					<div class="md:col-start-7 md:col-span-4 col-start-2 col-span-5">
						<svelte:component this={project.default}/>
					</div>
				<!-- images -->
				<div class="md:col-start-1 md:col-span-12 col-start-1 col-span-6 mb-24">
					<Carousel images={project.images}></Carousel>
					<!-- <img src={project.metadata.cover.replace(/^\/static/, '')} alt="hello"> -->
				</div>
			{/if}
		{/each}
	</section>

	<!-- WORK -->
	<section class="grid_template md:mt-12" id="work">
		<!-- section title -->
		<h4 class="md:col-start-5 text-gray mb-4 col-start-2 col-span-4">Clippings</h4>
		<!-- project block -->
		<div class="md:col-start-3 md:col-span-8 col-start-1 col-span-6">
			<div class="flex gap-4 col-span-3">
				{#each $allProjects as project}
					{#if project.metadata.featured === 'no'}
						<div class="flex-1">
							<div class="flex flex-col">
								<div class="flex flex-row justify-between">
									<div class="flex flex-row">
									<!-- project title -->
									<p class="md:mb-2 mb-0">
										{project.metadata.title}
									</p>
									<!-- project link -->
									{#if project.metadata.link}
										<a
											href={project.metadata.link}
											target="_blank"
											class="text-[0.5rem] px-[0.25rem] border border-black rounded-full ml-1 hover:link-hover" >Visit ↗</a>
									{/if}
									</div>
									<!-- project details -->
									<p class="mb-2 text-gray hidden md:block">{project.metadata.type} ({project.metadata.year})</p>
								</div>
								<!-- project details -->
								<p class="block md:hidden text-gray mb-0">
									{project.metadata.type} ({project.metadata.year})
								</p>
								<!-- project images -->
								<div class="my-2">
									<CarouselSingle images={project.images} height={200}>
									</CarouselSingle>
								</div>
								<!-- project details -->
								<svelte:component this={project.default} />
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</div>
	</section>

	<!-- COLOPHON -->
	<section class="grid_template">
		<div class="md:col-start-10 md:col-span-2 col-start-4 col-span-3">
			<p class="text-xs leading-3">
				<sup class="text-gray">Colophon</sup>
				This website is hand-coded and maintained by myself with the help of KD. Built with SvelteKit. Type is set in Fluxish by OSP Foundry.
			<br><br>
			Last updated on June 12, 2024 with love. Thank you for visiting!
			</p>
		</div>
	</section>
</div>
