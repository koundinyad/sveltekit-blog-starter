<!-- HOME -->
<script>
	import { writable } from 'svelte/store';
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

<div class="flex flex-col md:mx-4 mx-4">
	<!-- TITLE & MENU -->
	<section class="grid_template mt-12 md:mt-4 justify-end">
		<p class="md:col-start-4 md:col-span-3 col-start-1 col-span-2 mb-0">
			April Chu
		</p>
		<div class="md:col-end-10 md:col-span-3 col-start-3 col-span-6 place-self-end" >
			<Nav />
		</div>
	</section>

	<!-- ABOUT -->
	<section class="grid_template" id="about">
		<!-- <h4 class="md:col-start-5 col-start-2 text-gray mb-2">About</h4> -->
		<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6">
			<p class="text-xl md:text-2xl">
				April is designer that works with code. With roots in web and brand, her practice is supplemented by research into alternative Internet & media cultures<sup>01</sup>. Currently based in London by way of Taipei and California. She holds a master’s from the Creative Computing Institute (UAL) and a bachelor’s from Wellesley College.
			</p>
		</div>
		<div class="md:col-start-10 md:col-span-2 col-start-4 col-span-3 md:py-4">
			<p>
				<sup>01</sup>Currently building an online radio. You can read about it here.
			</p>
		</div>
	</section>

	<!-- FEATURED PROJECTS -->
	<section class="grid_template" id="featured-work">
		<!-- section title -->
		<h4 class="md:col-start-5 col-span-4 text-gray mb-4 col-start-2">Featured Projects</h4>
		<!-- project block -->
		{#each $allProjects as project}
			{#if project.metadata.featured === 'yes'}
				<!-- project title -->
				<div class="md:col-start-4 md:col-span-8 col-start-1 col-span-6">
					<div class="flex flex-row justify-between items-end">
						<div class="flex flex-row">
							<p class="text-lg md:text-xl mb-0">
								{project.metadata.title}
							</p>
							{#if project.metadata.link}
								<a
									href={project.metadata.link}
									target="_blank"
									style="background-color:{getRandomColor()};"
									class="text-xs px-[0.5rem] rounded-full text-white ml-1 hover:link-hover" >Visit ↗</a
								>
							{/if}
						</div>
						<!-- project info -->
						<p class="text-gray text-sm mb-0 hidden md:block">{project.metadata.type} ({project.metadata.year})</p>
					</div>
					<!-- sm: project info -->
					<p class="text-gray text-sm mb-0 block md:hidden">{project.metadata.type} ({project.metadata.year})</p>
				</div>
				<!-- images -->
				<div class="md:col-start-1 md:col-span-12 col-start-1 col-span-6">
					<Carousel images={project.images}></Carousel>
					<!-- <img src={project.metadata.cover.replace(/^\/static/, '')} alt="hello"> -->
				</div>
				<!-- project details -->
				<div class="md:col-start-4 md:col-span-4 col-start-2 col-span-5 mb-8 md:mb-24">
					<svelte:component this={project.default} />
				</div>
			{/if}
		{/each}
	</section>

	<!-- WORK -->
	<section class="grid_template md:mt-12" id="work">
		<!-- section title -->
		<h4 class="md:col-start-5 text-gray mb-4 col-start-2 col-span-4">Clippings</h4>
		<!-- project block -->
		<div class="md:col-start-4 md:col-span-3 col-start-1 col-span-3">
			<div class="flex gap-4">
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
											style="background-color:{getRandomColor()};"
											class="text-xs px-2 rounded-full text-white ml-1" ><div class="hover:rotate-90 transition-all duration-100">↗</div></a
										>
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

	<!-- CONTACT & COLOPHON-->
	<section class="grid_template" id="contact">
		<!-- contact -->
		<h4 class="md:col-start-5 md:col-span-2 text-gray md:row-start-1 col-start-2">Contact</h4>
		<div class="md:col-start-4 md:col-span-3 col-start-1 col-span-6">
			<p class="mb-0 text-sm">OPEN FOR PROJECTS</p>
			<a href="mailto:hi@april.wiki" class="text-xl hover:link-hover">hi@april.wiki</a>
			<p class="mt-4 mb-0">ELSEWHERE</p>
			<div class="flex">
				<a href="https://read.cv/aprlc" class="hover:link-hover text-xl">read.cv,&nbsp;</a>
				<a href="https://www.are.na/april-c" class="hover:link-hover text-xl"> are.na,&nbsp;</a>
				<a href="https://read.cv/aprlc" class="hover:link-hover text-xl">insta</a>
			</div>
		</div>
		<!-- colophon -->
		<h4 class="md:col-start-8 md:col-span-2 text-gray md:row-start-1 col-start-2 mt-12 md:mt-0">Colophon</h4>
		<div class="md:col-start-7 md:col-span-3 col-start-1 col-span-6">
		<p>
			This website is hand-coded and maintained by myself. Built with SvelteKit. Type is set in Fluxish by OSP Foundry.
			<br><br>
			Last updated on June 12, 2024 with love. Thank you for visiting!
		</p>
		</div>
	</section>
</div>
