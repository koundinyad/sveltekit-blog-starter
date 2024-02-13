<!-- PROJECT LAYOUT -->
<script>
    import { image } from '$lib/components/store.js';
    
    export let title;
    export let year;
    export let slug;
    export let type;
  
    let images = [];
    let filteredImages = [];
    // const imageModules = import.meta.glob("./images/**/*.{jpg,jpeg,png,gif,webp}");
    const imageModules = import.meta.glob("/static/images/**/*.{jpg,jpeg,png,gif,webp,webm}", { eager: true });

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

      // display image in $image container
      function displayImage (src) {
        $image = src.replace(/^\/static/, '');
      }
  </script>

  <!-- PROJECT -->
  <section class="md:col-start-5 md:col-span-2">
    <div class="fixed top-1/2">
      <h2>{title}</h2>
    </div>
  </section>

  <!-- DESCRIPTION -->
  <section class="md:col-start-1 md:row-start-6 "> 
    <div class="fixed bottom-0 w-[20ch]">
      <p class="mb-0 text-xs">Year: {year}</p>
      <p class="text-xs">Role: {type}</p>
    </div>
  </section>

  <section class="col-start-3 col-span-4 row-start-6 justify-end"> 
    <div class="fixed bottom-0 w-[40ch]">
      <slot></slot>
    </div>
  </section>

  <!-- IMAGES -->
  <div class="col-start-7 col-span-6">
    {#if filteredImages.length > 0}
      {#each filteredImages as { src, alt }, index}
      <div class="mt-0">
        <img class="flex items-start object-cover md:w-full " src={src.replace(/^\/static/, '')} alt={alt}>
      </div>
      {/each}
    {:else}
      <p>No images to display</p>
    {/if}
  </div>
  


  

