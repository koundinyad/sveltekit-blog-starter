<!-- NAVIGATION MENU -->
<script>
	import { page } from '$app/stores';
	import { afterUpdate } from 'svelte';

	const menus = [
		{
			name: 'About',
			href: '#about'
		},
		{
			name: 'Featured',
			href: '#featured-work'
		},
		{
			name: 'Work',
			href: '#work'
		},
		{
			name: 'Contact',
			href: '#contact'
		}
	];

	// // Check url as soon as pages update
	// afterUpdate(() => {
	// 	currentPage = $page.url.pathname;
	// 	currentPageName = getPageName(currentPage);
	// 	console.log(currentPage);
	// });

	// function getPageName(url) {
	// 	const menuItem = menus.find((menu) => menu.href === url);
	// 	console.log(menuItem);
	// 	return menuItem ? menuItem.name : 'Menu';
	// }
</script>

<nav class="text-sm">
	{#each menus as menu}
		{#if menu.href !== $page.url.pathname}
			<a href={menu.href} class="pr-2">{menu.name}</a>
		{/if}
	{/each}
</nav>

