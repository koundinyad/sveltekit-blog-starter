<script>
	const projectModules = import.meta.glob('../projects/*.md', { eager: true });
	const projects = Object.values(projectModules);
	import { AccordionItem, Accordion } from 'flowbite-svelte';

	import ImageDisplay from '$lib/components/ImageDisplay.svelte';

	import { image } from '$lib/components/store.js';

	$: console.log({img: $image})
	 
	 let imageContainer;
</script>

<div id="container">
	<div class="grid grid-cols-2 gap-0">
		<section class="flex flex-col h-screen justify-between">
			<div>
				<h1 class="title font-serif mb-6">
					April Chu
				</h1>
				<div class="about max-w-[50ch]">
					<p>
						Design, code, etc. <br/>
						Based in London by way of California and Taipei. <br/>
						Interested in alternative media and re-enchanting the web. 
					</p>
				</div>
			</div>

			<div bind:this = {imageContainer}>
			</div>
				
			<img src={`${$image}`} alt="heyy"/>
		</section>

		<section>
			<h2 class="font-serif mb-6">Work</h2>
			  <Accordion flush class="text-black" classActive="text-black" classInactive="text-black">
				{#each projects as project}
					<AccordionItem class="border-0 text-black block text-base" classInactive="border-0" classActive="border-0" borderSharedClass="border-0" paddingFlush="py-3">
					<span slot="header" class="grid grid-cols-6 place-content-stretch border-t border-black pt-1">
						<span class="col-span-3">
							{project.metadata.title}
						</span>
						<span class="col-span-2">
							{project.metadata.type}
						</span>
						<span class="col-span-1">
							{project.metadata.date}
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
	</div>
</div>
