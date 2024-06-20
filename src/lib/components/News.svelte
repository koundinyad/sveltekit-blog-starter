<script>
	import Draggable from './Draggable.svelte';
	let menuOpen = true;
	let menuRef;

	function toggleMenu() {
		menuOpen = !menuOpen;
		console.log(menuOpen ? 'open' : 'close');
	}
</script>

<Draggable>
    <div class="bg-[#c5e618] px-4 py-2 text-darkGray rounded-sm" bind:this={menuRef}>
        <div class="flex flex-row justify-between items-start">
            {#if menuOpen}
                <p class="mb-0 text-xs">A note</p>
            {/if}
            <button on:click|stopPropagation={toggleMenu} class="text-xs p-0 mb-0 hover:link-hover">
                {menuOpen ? '✕' : 'A note'}
            </button>
        </div>
        {#if menuOpen}
        <div class="md:w-[300px] w-[250px] pt-4">
            <p class="text-xs leading-3">
                [Currently building] <br>
                A web app for taking walks on the Internet w/ my friend <a href="https://koundinya.website/" target="_blank">KD</a>. Follow along on <a href="https://www.are.na/april-c/work-listlist" target="_blank">are.na</a>.
            </p>
            <p class="text-xs leaading-3">
                [Recently read] <br>
                Mild Vertigo by Mieko Kanai. A dizzying stream of consciousness. Made me think of my mom. 
            </p>
        </div>
        {/if}
    </div>
</Draggable>
