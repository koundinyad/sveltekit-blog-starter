<script>
	import Carousel from 'svelte-light-carousel';
    export let images;
    const slides = images;
</script>


<Carousel {slides} layout={{
			xs: 1,
			sm: 1,
			md: 2,
			lg: 2,
			xl: 3
		}} gap={{default: 2}}>
        <img src={slide.src.replace(/^\/static/, '')} alt={slide.alt} slot="slide" let:slide class="object-cover w-full md:h-[500px] h-[250px]">
    <div
			slot="dots"
			let:dots
			let:a11y
			let:scrollTo
			data-progress
			class="gap-1 flex self-end z-10 mt-2"
			{...a11y}
		>
		{#each dots as { a11y }, i}
            <button
                {...a11y}
                on:click={() => scrollTo(i)}
                class={'rounded-full cursor-pointer transition-all w-2 h-2  aria-[selected="true"]:bg-[#CAC444] bg-[#85bfc8]'}
            />
		{/each}
	</div>
</Carousel>