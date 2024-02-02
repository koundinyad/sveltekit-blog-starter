<slot></slot>

<script>
    import { base } from '$app/paths'
    import { image } from '$lib/components/store.js';

    export let slug;
  
    let images = [];
    let filteredImages = [];
    // const imageModules = import.meta.glob("./images/**/*.{jpg,jpeg,png,gif,webp}");
    const imageModules = import.meta.glob("/static/images/**/*.{jpg,jpeg,png,gif,webp}", { eager: true });

    // console.log(imageModules);

    const loadImageData = async (modulePath) => {
      const imageName = modulePath.split('/').pop().split('.')[0]; // Extract the filename without extension
      const altText = imageName.replace(/_/g, ' '); // Replace underscores with spaces
      // const { default: imageUrl } = await imageModules[modulePath]();
      return { src: modulePath, alt: altText };
    };
  
    Promise.all(Object.keys(imageModules).map(loadImageData))
      .then((loadedImages) => {
        images = loadedImages;
        filteredImages = images.filter((img) => img.src.includes(slug));
        // console.log(filteredImages);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });

      function displayImage (src) {
        // $image = "../src/projects" + src.replace(/^\./, '');
        // $image = src;
        // $image = src.replace(/^\./, '');
        $image = src.replace(/^\/static/, '');
        // console.log($image);
    }

    function shouldApplyLeftBorder(index) {
      return index % 3 == 0; // Apply border-l to first item in row
    }

    function shouldApplyTopBorder(index) {
      return index < 3; // Apply border-t to items in the first row
    }
  </script>

<div class="grid grid-cols-3 ">
    {#if filteredImages.length > 0}
      {#each filteredImages as { src, alt }, index}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="h-[50px] md:h-[100px] flex items-center hover:bg-pink font-sans border-r border-b border-black {shouldApplyLeftBorder(index) ? 'border-l' : ''} {shouldApplyTopBorder(index) ? 'border-t' : ''}" on:mouseenter={() => displayImage(src)} on:click={() => displayImage(src)}>
            <p class="m-auto text-center text-sm">{alt}</p>
        </div>
      {/each}
    {:else}
      <p>No images to display</p>
    {/if}
  </div>

