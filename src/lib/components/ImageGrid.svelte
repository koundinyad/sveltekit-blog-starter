<!-- ImageGrid.svelte -->

<script>
  import ImageDisplay from '$lib/components/ImageDisplay.svelte';
  import { writable } from 'svelte/store';
  import { image } from './store.js';

  let images = [];

//   for(let i = 0; i < 3; i++) {
//     images.push(`/radio/${i}.jpg`);
//   }

  const imageModules = import.meta.glob("../../projects/images/radio/*.{jpg,jpeg,png,gif}");

  const loadImageData = async (modulePath) => {
    const imageName = modulePath.split('/').pop().split('.')[0]; // Extract the filename without extension
    const altText = imageName.replace(/_/g, ' '); // Replace underscores with spaces

    const { default: imageUrl } = await imageModules[modulePath]();
    console.log(modulePath, imageUrl);

    return { src: imageUrl, alt: altText };
  };

  Promise.all(Object.keys(imageModules).map(loadImageData))
    .then((loadedImages) => {
      images = loadedImages;
    })
    .catch((error) => {
      console.error('Error loading images:', error);
    });

    function displayImage (src) {
        $image = src;
        console.log($image);
    }

</script>
  
  <div class="grid grid-cols-3">
    {#if images.length > 0}
      {#each images as { src, alt }}
        <div class="border border-black h-[100px] flex items-center" on:mouseenter={() => displayImage(src) }>
            <p class="m-auto text-center">{alt}</p>
        </div>
      {/each}
    {:else}
      <p>No images to display</p>
    {/if}
  </div>

    <!-- <div class="grid grid-cols-3">
    {#if images.length > 0}
      {#each images as img}
        <div class="border border-black h-[100px] flex items-center" on:mouseenter={() => displayImage(src) }>
            <p class="m-auto text-center">{alt}</p>
        </div>
      {/each}
    {:else}
      <p>No images to display</p>
    {/if}
  </div> -->