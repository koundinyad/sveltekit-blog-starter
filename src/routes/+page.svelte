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

<div id="container" class="absolute px-4 py-0 h-screen w-full">
	<div class="grid gap-x-8 h-screen md:grid-cols-12 md:grid-rows-6 relative">
		<!-- PROJECT TITLE	 -->
		<section class="col-start-5 col-span-2 row-start-4">
			<div class="fixed top-1/2 text-sm z-50">
				<h2 class="text-sm text-white">{currentProjectTitle}</h2>
			</div>
		</section>
	
		<!-- PROJECT COVER IMAGE -->
		<section class="col-start-2 col-span-10 row-start-1">
			<!-- Each project section -->
			{#each filteredProjects as project}
			<div class="projectContainer h-min overflow-auto" data-project-title={project.metadata.title}>
				<a href={project.metadata.slug}>
					<div class="projectContent h-screen overflow-contain text-sm">
						<!-- set the cover photo for the project, if it exists -->
						{#if project.metadata.cover}
							<img src={project.metadata.cover.replace(/^\/static/, '')} alt={`${project.metadata.title} ${setAlt(project.metadata.cover)}`}>
						{:else}
							<img src="/images/default.webp" alt="placeholder">
						{/if}
					</div>
				</a>
			</div>
			{/each}
		</section>
	</div>
</div>
