<slot></slot>


<script>
    import { image } from '$lib/components/store.js';
    
    export let slug

    console.log(slug)
  
    let images = [];
    let filteredImages = [];
    const imageModules = import.meta.glob("./images/**/*.jpg"); 

    const staticModules = import.meta.glob("../*.{jpg,jpeg,png,gif}");
    import.meta.glob('../static/')

    for (const path in staticModules) {
  imageModules[path]().then((mod) => {
    console.log("image", path, mod)
  })}

    const loadImageData = async (modulePath) => {
      const imageName = modulePath.split('/').pop().split('.')[0]; // Extract the filename without extension
      const altText = imageName.replace(/_/g, ' '); // Replace underscores with spaces
  
      const { default: imageUrl } = await imageModules[modulePath]();
    //   console.log(modulePath);
  
      return { src: modulePath, alt: altText };
    };
  
    Promise.all(Object.keys(imageModules).map(loadImageData))
      .then((loadedImages) => {
        images = loadedImages;
        filteredImages = images.filter((img) => img.src.includes(slug));
        console.log(filteredImages);
      })
      .catch((error) => {
        console.error('Error loading images:', error);
      });

      function displayImage (src) {
        // $image = "../src/projects" + src.replace(/^\./, '');
        $image = src;
        console.log($image);
    }
  </script>

<div class="grid grid-cols-3">
    {#if filteredImages.length > 0}
      {#each filteredImages as { src, alt }}
        <div class="border border-black h-[100px] flex items-center" on:mouseenter={() => displayImage(src)}>
            <p class="m-auto text-center">{alt}</p>
        </div>
      {/each}
    {:else}
      <p>No images to display</p>
    {/if}
  </div>

