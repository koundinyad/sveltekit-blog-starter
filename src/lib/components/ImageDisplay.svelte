<!-- ImageDisplay.svelte -->

<script>
  import { onMount } from 'svelte';

  export let imagePath = ''; // Allow the parent component to pass the image path

  let imageUrl = ''; // Initially empty, will be set to the image URL

  async function getImage() {
    try {
      // Fetch the image using the provided imagePath
      const response = await fetch(imagePath);
      const blob = await response.blob();
      imageUrl = URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error fetching image:', error);
    }
  }

  onMount(getImage);
</script>

<div id="display_image" class="display_image p-4 border border-black h-[500px] w-[400px]">
  {#if imageUrl}
    <img src={imageUrl} alt="Displayed Image" />
  {:else}
    <p>Loading image...</p>
  {/if}
</div>
