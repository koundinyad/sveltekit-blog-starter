<script>
	import Carousel from 'svelte-light-carousel';
	// import { slide } from 'svelte/types/runtime/transition';

    export let images;

    const slides = images;
</script>


<Carousel {slides}>
	<!-- <div slot="slide" let:slide>{slide.title}</div> -->
    <img src={slide.src.replace(/^\/static/, '')} alt={slide.alt} slot="slide" let:slide class="object-cover w-full h-[400px]">

    <button
        slot="next"
        let:next
        let:canScrollNext
        class={`btn w-fit absolute right-0 top-0 bottom-0 my-auto ${
            !canScrollNext ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        on:click={next}
        let:a11y
        {...a11y}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
    </button>
    <button
        slot="prev"
        let:prev
        let:canScrollPrev
        on:click={prev}
        class={`btn w-fit absolute left-0 top-0 bottom-0 my-auto ${
            !canScrollPrev ? 'opacity-50 !cursor-not-allowed' : ''
        }`}
        let:a11y
        {...a11y}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
    </button>
</Carousel>



<!-- <script>
    import { onMount } from 'svelte';
    import EmblaCarousel from 'embla-carousel';
    import { onDestroy } from "svelte";

    export let images;

    let embla;
    let canScrollPrev = false;
    let canScrollNext = false;

    function checkScroll() {
        if (embla) {
            canScrollPrev = embla.canScrollPrev();
            canScrollNext = embla.canScrollNext();
        }
    }

    function prev() {
        if (embla) embla.scrollPrev();
    }

    function next() {
        if (embla) embla.scrollNext();
    }

    onMount(() => {
        const options = { loop: true }; // Adjust options as needed
        embla = EmblaCarousel(document.querySelector('.embla'), options);
        embla.on('select', checkScroll);
        checkScroll();
    });
</script>

<div class="embla overflow-hidden">
    <div class="embla_container flex flex-start">
        {#if images.length > 0}
            {#each images as { src, alt }}
                <div class="embla__slide flex-none w-full h-[420px]">
                    <img class="object-cover w-full h-[420px]" src={src.replace(/^\/static/, '')} {alt} />
                </div>
            {/each}
        {:else}
            <p>No images to display</p>
        {/if}
    </div>
</div>

<div class="controls">
    <button on:click={prev} disabled={!canScrollPrev}>Left</button>
    <button on:click={next} disabled={!canScrollNext}>Right</button>
</div> -->


<!-- <script>
  import { onMount } from "svelte";
  import EmblaCarousel from "embla-carousel";
  import { onDestroy } from "svelte";

  let embla;

  function toLeft() {
    if (embla && embla.canScrollPrev()) {
      embla.scrollPrev();
    }
  }

  function toRight() {
    if (embla && embla.canScrollNext()) {
      embla.scrollNext();
    }
  }

  onMount(() => {
    const options = { loop: true }; // Customize options as needed
    embla = EmblaCarousel(document.querySelector(".embla"), options);

    // Ensure to cleanup when component is destroyed
    onDestroy(() => {
      if (embla) {
        embla.destroy();
        embla = null;
      }
    });
  });
</script>

<div class="embla overflow-hidden">
  <div class="embla__container flex flex-start">
    <slot></slot>
  </div>
</div>

<button on:click={toLeft}>scroll to the left</button>
<button on:click={toRight}>scroll to the right</button> -->
