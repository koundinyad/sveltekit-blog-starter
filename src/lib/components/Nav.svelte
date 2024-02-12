<!-- NAVIGATION MENU -->
<script>
    import { page } from "$app/stores";
    import { afterUpdate } from 'svelte';
    const projectModules = import.meta.glob('../../projects/*.md', { eager: true });
    const projects = Object.values(projectModules);

    const projectMenuItems = projects.map(project => ({
      name: project.metadata.title,
      href: "/" + project.metadata.slug,
    }));

    console.log(projectMenuItems);

    const menus = [
      {
        name: "Work",
        href: "/",
      },
      {
        name: "About",
        href: "/about",
      },
      // Add project menu items to the menu
      // ...projectMenuItems
    ];

    console.log(menus);

    let currentPage = "";
    let currentPageName = "";
    // Check url as soon as pages update
    afterUpdate(() => {
      currentPage = $page.url.pathname;
      currentPageName = getPageName(currentPage);
    });

    function getPageName(url) {
      const menuItem = menus.find(menu => menu.href === url);
      return menuItem ? menuItem.name : "Work";
    }


  let showModal = false;

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }
</script>

<section class="col-start-4 z-50">
  <div class="fixed top-2/4 text-sm">
    <button class="w-full text-left" on:click={openModal} on:mouseenter={openModal}>
      <nav>
        {currentPageName} *
      </nav>
    </button>
    {#if showModal}
      <div on:click={closeModal} on:keypress={closeModal} on:mouseleave={closeModal} role="button" tabindex="0">
        <nav class="flex flex-col">
          {#each menus as menu}
            {#if menu.href !== $page.url.pathname}
              <a href={menu.href}>{menu.name}</a>
            {/if}
          {/each}
        </nav>
      </div>
    {/if}
  </div>
</section>