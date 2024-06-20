<script>
	import Carousel from 'svelte-light-carousel';
    export let images;
    const slides = images;
    export let height;
</script>


<Carousel {slides}>
    <img src={slide.src.replace(/^\/static/, '')} alt={slide.alt} slot="slide" let:slide class="object-cover w-full md:h-auto">
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
                class={'rounded-full cursor-pointer transition-all w-1.5 h-1.5  aria-[selected="true"]:bg-darkGray bg-gray'}
            />
		{/each}
	</div>
    <!-- <div
        slot="pagination"
        class="w-fit flex flex-row gap-4 my-2"
        let:prev
        let:canScrollPrev
        let:next
        let:canScrollNext
        let:nextA11y
        let:prevA11y
    >
        <button
            {...prevA11y}
            class={`btn ${!canScrollPrev ? 'opacity-50 cursor-not-allowed' : ''}`}
            on:click={prev}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-2 h-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style="fill:#232326" d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z" data-name="Left"/></svg>
            </svg>
        </button>
        <button
            {...nextA11y}
            class={`btn ${!canScrollNext ? 'opacity-50 !cursor-not-allowed' : ''}`}
            on:click={next}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-2 h-4"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 25 25"><path style="fill:#232326" d="m17.5 5.999-.707.707 5.293 5.293H1v1h21.086l-5.294 5.295.707.707L24 12.499l-6.5-6.5z" data-name="Right"/></svg>
            </svg>
        </button>
    </div> -->
</Carousel>