<!-- NAVIGATION MENU -->
<script>
    import { page } from "$app/stores";
    import { afterUpdate } from 'svelte';
    const projectModules = import.meta.glob('../../projects/*.md', { eager: true });
    const projects = Object.values(projectModules);

    let showModal = false;
    let isHovered = false;
    let currentPage = "";
    let currentPageName = "";

    const projectMenuItems = projects.map(project => ({
      name: project.metadata.title,
      href: "/" + project.metadata.slug,
    }));

    const menus = [
      {
        name: "Work",
        href: "/",
      },
      {
        name: "About",
        href: "/about",
      },
    ];

    const projectMenu = [
      ...projectMenuItems
    ]

    // Check url as soon as pages update
    afterUpdate(() => {
      currentPage = $page.url.pathname;
      currentPageName = getPageName(currentPage);
    });

    function getPageName(url) {
      const menuItem = menus.find(menu => menu.href === url);
      return menuItem ? menuItem.name : "Project";
    }

  function openModal() {
    showModal = true;
  }

  function closeModal() {
    showModal = false;
  }

  function toggleHover() {
    isHovered = !isHovered;
  }
</script>

<div on:mouseenter={toggleHover} on:mouseleave={toggleHover}>
  <button class="text-left" on:click={openModal} on:mouseenter={openModal}>
    <h2>
      {currentPageName} {isHovered ? '+' : '*'}
    </h2>
  </button>
  {#if showModal}
    <div on:click={closeModal} on:keypress={closeModal} on:mouseleave={closeModal} role="button" tabindex="0">
      <nav class="flex flex-col text-sm">
        {#each menus as menu}
          {#if menu.href !== $page.url.pathname}
            <a href={menu.href}>{menu.name}</a>
          {/if}
        {/each}
      </nav>
    </div>
  {/if}
</div>