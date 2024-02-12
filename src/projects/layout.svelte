<script>
    import { image } from '$lib/components/store.js';
    
    export let title;
    export let slug;
  
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

<div id="container" class="absolute px-4 py-0 md:px-8 md:py-0 h-screen w-full">
	<div class="grid gap-4 md:grid-cols-12">
    <!-- TITLE -->
    <section>
      <h1 class="fixed top-2/4 text-sm mb-2 md:mb-6">
        <a href="/">April Chu</a>
      </h1>
    </section>

    <!-- PROJECT -->
    <section class="col-start-5 col-span-2">
      <div class="fixed text-center top-2/4">
        <!-- Display the current project title -->
        <h2 class="text-sm">{title}</h2>
        <!-- Display the project description -->
      </div>
    </section>

    <!-- DESCRIPTION -->
    <section class="col-start-4 col-span-3">
      <div class="fixed w-3/12 top-2/4 mt-12">
        <slot></slot>
    </div>
    </section>

    <!-- IMAGES -->
    <div class="col-start-8 col-span-5">
      {#if filteredImages.length > 0}
        {#each filteredImages as { src, alt }, index}
        <div class="mt-0">
          <img class="flex items-start object-cover md:w-full " src={src.replace(/^\/static/, '')} alt={alt}>
          <!-- <div class="font-serif w-full mt-4  border-b border-black">
            <p class="text-xs mb-1 font-sans">{alt}</p>
          </div> -->
        </div>
        {/each}
      {:else}
        <p>No images to display</p>
      {/if}
    </div>

	</div>
</div>


  

