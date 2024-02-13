<!-- HOME -->
<script>
	const projectModules = import.meta.glob('../projects/*.md', { eager: true });
	const projects = Object.values(projectModules);
	import { projectContent } from '$lib/components/store.js';
	import { onMount } from 'svelte';

	// Filter the post and order them by published date
	const filteredProjects = projects
		.filter((project) => !project.metadata.hidden)
		.sort((a, b) =>
			new Date(a.metadata.date) > new Date(b.metadata.date)
				? -1
				: new Date(a.metadata.date) < new Date(b.metadata.date)
				? 1
				: 0
		);

	// Set the content of the project
	function setProjectContent(project) {
		$projectContent = project.default;
	}

	function setAlt(src) {
		const imageName = src.split('/').pop().split('.')[0]; // Extract the filename without extension
		const alt = imageName.replace(/_/g, ' '); // Replace underscores with spaces

		return alt;
	}

	// Sticky Title: Intersection Observer
	let currentProjectTitle = ""; // Initialize with an empty string
	let firstProjectTitle = "";

	onMount(() => {
		// Manually set the currentProjectTitle to the title of the first project
		if (filteredProjects.length > 0) {
			firstProjectTitle = filteredProjects[0].metadata.title;
			currentProjectTitle = filteredProjects[0].metadata.title;
		}
		const io_options = {
			root: null, // Intersection observer will observe the entire viewport
			rootMargin: '10px 0px 0px 0px', // Adjust rootMargin as needed
			threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.95, 1.0],
		};

		const io_callback = (entries, observer) => {
			entries.forEach(entry => {
			if (entry.isIntersecting) {
				// console.log(entry.target.dataset.projectTitle + `${Math.floor(entry.intersectionRatio * 100)}%`);
				// only update current title if 59% in viewport
				if (Math.floor(entry.intersectionRatio * 100) >= 59) {
					currentProjectTitle = entry.target.dataset.projectTitle;
				}
			} 
			});
		};

		const io_observer = new IntersectionObserver(io_callback, io_options);

		const projectContainers = document.querySelectorAll('.projectContainer');
		projectContainers.forEach(element => {
			io_observer.observe(element);
		});

		return () => io_observer.disconnect();
	});

</script>

<!-- <div id="container" class="absolute px-4 h-screen w-full">
	<div class="grid gap-x-2 md:gap-x-8 grid-cols-4 md:grid-cols-12 md:grid-rows-6 h-screen relative"> -->
		<!-- PROJECT TITLE	 -->
		<section class="col-start-4 md:col-start-5 md:col-span-2 bg-blue-500 z-50">
			<div class="fixed top-1/2">
				<h2 class="text-white">{currentProjectTitle}</h2>
			</div>
		</section>
	
		<!-- PROJECT COVER IMAGE -->
		<section class=" absolute md:col-end-12 md:col-start-2 bg-yellow-500">
			<!-- Each project section -->
			{#each filteredProjects as project}
			<div class="projectContainer h-screen overflow-auto" data-project-title={project.metadata.title}>
				<a href={project.metadata.slug}>
					<div class="projectContent h-screen w-full">
						<!-- set the cover photo for the project, if it exists -->
						{#if project.metadata.cover}
							<img class="object-cover w-screen h-full" src={project.metadata.cover.replace(/^\/static/, '')} alt={`${project.metadata.title} ${setAlt(project.metadata.cover)}`}>
						{:else}
							<img src="/images/default.webp" alt="placeholder">
						{/if}
					</div>
				</a>
			</div>
			{/each}
		</section>
	<!-- </div>
</div> -->
