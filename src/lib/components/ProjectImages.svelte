<!-- ProjectImages.svelte -->
<script context="module">
  export async function load({ params }) {
    const { slug } = params;
    const res = await fetch(`/api/${slug}`); // Fetch data from endpoint
    const { post } = await res.json();

    return {
      props: {
        post
      }
    };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { error } from '@sveltejs/kit';

  let images = [];

  onMount(async () => {
    const imageModules = import.meta.glob(`/static/images/${$post.slug}/*.{jpg,jpeg,png,gif,webp,webm}`);

    const loadImageData = async (modulePath) => {
      const imageName = modulePath.split('/').pop().split('.')[0]; // Extract the filename without extension
      const altText = imageName.replace(/_/g, ' '); // Replace underscores with spaces
      const { default: imageUrl } = await imageModules[modulePath]();
      return { src: imageUrl, alt: altText };
    };

    Promise.all(Object.keys(imageModules).map(loadImageData))
      .then((loadedImages) => {
        images = loadedImages;
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });
  });
</script>

<main class="container mx-auto py-8">
  {#if $post}
    <h1 class="text-3xl font-bold mb-8">{post.title}</h1>
    <div class="grid grid-cols-3 gap-4">
      {#each images as image}
        <img src={image.src} alt={image.alt} class="rounded-lg">
      {/each}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}
</main>

<style>
  .container {
    max-width: 960px;
  }
</style>
