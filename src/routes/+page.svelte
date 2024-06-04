<!-- HOME -->
<script>
	const projectModules = import.meta.glob('../projects/*.md', { eager: true });
	const projects = Object.values(projectModules);

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
	function setAlt(src) {
		const imageName = src.split('/').pop().split('.')[0]; // Extract the filename without extension
		const alt = imageName.replace(/_/g, ' '); // Replace underscores with spaces

		return alt;
	}

</script>

<!-- FEATURED PROJECTS -->
<section class="grid_template" id="featured-work">
	<h4 class="md:col-start-5 col-span-2 text-gray mb-2 col-start-2">Featured Projects</h4>
	{#each filteredProjects as project}
		{#if project.metadata.featured === "yes"}
			<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6">
				<div class="flex flex-col justify-between">
					<p class="text-xl mb-0">{project.metadata.title}<sup class="text-gray">({project.metadata.year}) {project.metadata.type}</sup></p>
					<!-- <p class="text-gray mb-0">({project.metadata.year}) {project.metadata.type}</p> -->
				</div>
			</div>
			<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6 h-[400px] bg-blue-200 md:mb-12">
				IMAGES
			</div>
			<div class="md:col-start-10 md:col-span-2 col-start-2 col-span-5 mb-8 md:mb-0">
				<svelte:component this={project.default} />
			</div>

		{/if}
	{/each}
</section>

<!-- WORK -->
<section class="grid_template md:mt-12" id="work">
	<h4 class="md:col-start-5 text-gray mb-2 col-start-2 col-span-2">Work</h4>
	<div class="md:col-start-4 md:col-span-6 col-start-1 col-span-6">
		<div class="flex gap-4">
		{#each filteredProjects as project}
			{#if project.metadata.featured === "no"}
			<div class="flex-1">
				<div class="flex flex-col">
					<p class="mb-0">{project.metadata.title}<sup class="text-gray hidden md:block">({project.metadata.year}) {project.metadata.type}</sup></p>
					<p class="block md:hidden text-gray mb-0">({project.metadata.year}) {project.metadata.type}</p>
				</div>
				<div class="h-[200px] bg-blue-100 my-2">
					IMAGES
				</div>
				<svelte:component this={project.default} />
			</div>
			{/if}
		{/each}
	</div>
	</div>

</section>
