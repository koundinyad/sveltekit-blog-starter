<script>
	let name = 10;

	function add() {
		name = name + 1;
	}
</script>

<h1>This is my {name}</h1>

<button on:click={add}>add</button>
