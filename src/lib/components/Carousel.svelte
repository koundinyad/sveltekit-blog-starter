<script>
	import Carousel from 'svelte-light-carousel';
    export let images;
    const slides = images;
</script>

<style>
  .bg-gradient-to-r {
    background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 4%, white 99%, white 100%);
  }
</style>


<Carousel {slides} layout={{
			xs: 1,
			sm: 1,
			md: 2,
			lg: 2,
			xl: 3
		}} gap={{default: 2}}>
        <img src={slide.src.replace(/^\/static/, '')} alt={slide.alt} slot="slide" let:slide class="object-cover w-full md:h-[500px] h-[300px]">

	<div class="absolute top-0 right-0 h-full w-1/10 bg-red-500 z-[100]"></div>
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
                class={'rounded-full cursor-pointer transition-all w-1.5 h-1.5 aria-[selected="true"]:bg-[#c5e618] bg-[#e7f6a1]'}
            />
		{/each}
	</div>
</Carousel>
