<script>
	const projectModules = import.meta.glob('../projects/*.md', { eager: true });
	const projects = Object.values(projectModules);
	import { AccordionItem, Accordion } from 'flowbite-svelte';
	import { image } from '$lib/components/store.js';

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
</script>

<div id="container" class="px-4 py-6 md:px-8 md:py-6">
	<div class="grid auto-rows-min gap-8 md:grid-cols-2 md:auto-cols-min md:gap-0">
		<section>
			<h1 class="title font-serif mb-2 md:mb-6">
				April Chu
			</h1>
			<div class="about max-w-[50ch]">
				<p>
					Design, code, etc. <br/>
					Based in London by way of California and Taipei. <br/>
					Interested in alternative media and re-enchanting the web. 
				</p>
				<p class="hidden md:block">
					CONTACT <br/>
					(email) hi@april.wiki <br/>
					(insta) @in____april
				</p>
			</div>
		</section>

		<section class="md:row-span-3">
			<h2 class="font-serif mb-2 md:mb-6">Work</h2>
			  <Accordion flush class="text-black" classActive="text-black" classInactive="text-black">
				{#each filteredProjects as project}
					<AccordionItem class="border-0 text-black block text-sm md:text-base" classInactive="border-0" classActive="border-0" borderSharedClass="border-0" paddingFlush="py-3">
					<span slot="header" class="grid grid-cols-7 place-content-stretch border-t border-black pt-1">
						<span class="col-span-3">
							{project.metadata.title}
						</span>
						<span class="col-span-3">
							{project.metadata.type}
						</span>
						<span class="col-span-1">
							{project.metadata.year}
						</span>
					</span>
					<div slot="arrowup" class="hidden w-0">
					</div>
					<div slot="arrowdown" class="hidden w-0">
					</div>
					<p class="font-serif">
						<svelte:component this={project.default} />
					</p>
					</AccordionItem>
				{/each}
			  </Accordion>
		</section>

		<section class="flex flex-col md:justify-self-start md:fixed md:bottom-4">
			<img src={$image} class="p-4 border border-black w-full flex-1 max-h-[600px] md:max-w-[480px] md:max-h-[540px] md:mt-20"/>
			<div class="block md:hidden border-t border-black mt-20">
				<p class="pt-2 max-w-[50ch]">
					CONTACT <br/>
					(email) hi@april.wiki <br/>
					(insta) @in____april
				</p>
		</section>
	</div>
</div>
