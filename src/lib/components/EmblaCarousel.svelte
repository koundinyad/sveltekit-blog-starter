<script>
    import emblaCarouselSvelte from 'embla-carousel-svelte'
    import Autoplay from 'embla-carousel-autoplay'
    import AutoHeight from 'embla-carousel-auto-height'

    let options = { loop: true }
    let plugins = [Autoplay({delay: 4000})]
</script>


<div class="embla overflow-hidden" use:emblaCarouselSvelte="{{ options, plugins }}">
    <div class="embla_container flex flex-start">
        <slot></slot>
    </div>
</div>
