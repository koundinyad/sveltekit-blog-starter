<!-- PROJECT PAGE -->
<script>
	// Importing site config
	import { config } from '../../site.config';

	export let data;
	let { post } = data;

	let title = post.metadata.title;
	let year = post.metadata.year;
	let slug = post.metadata.slug;
	let type = post.metadata.type;

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

</script>

<svelte:head>
	<!-- Shorthand for - If the post exists, return the string, else return 404 -->
	<title>{post ? `${post.metadata.title} | ${config.title}` : '404'}</title>
</svelte:head>

<!-- PROJECT -->
<section class="col-start-4 text-white md:text-black md:col-start-5 md:col-span-2 z-50">
    <div class="fixed top-1/2">
      <h2>{title}</h2>
    </div>
  </section>

  <!-- DESCRIPTION -->
  <section class="hidden md:grid md:col-start-1 row-start-6 z-50">
    <div class="fixed md:bottom-0 w-[20ch] text-black">
      <p class="mb-0 text-xs">Year: {year}</p>
      <p class="text-xs">Role: {type}</p>
    </div>
  </section>

  <section class="col-start-1 text-white md:text-black md:col-start-3 md:col-span-4 md:row-start-6 justify-end z-50"> 
    <div class="fixed bottom-0 w-[40ch]">
		<svelte:component this={post.default} />
    </div>
  </section>

  <!-- IMAGES -->
  <div class="absolute md:grid md:col-start-7 md:col-span-6">
    {#if filteredImages.length > 0}
      {#each filteredImages as { src, alt }, index}
      <div class="mt-0 w-screen md:w-full">
        <img class="flex items-start object-cover" src={src.replace(/^\/static/, '')} alt={alt}>
      </div>
      {/each}
    {:else}
      <p>No images to display</p>
    {/if}
  </div>


  

