<script>
	const postsModules = import.meta.glob('../posts/*.md', { eager: true });

	const posts = Object.values(postsModules);
</script>

<div id="container">
	<div class="about">
		<p>
			Hello! This is a portfolio skeleton template built with Svelte. You can start editing the
			content by editing the files in the <code>/src</code>
			folder.
		</p>
		<p>
			All of the files and code for this website are in <code>/src</code> folder along with new
			pages like <a href="/about">this one</a>
		</p>
	</div>
	<section>
		<h2>Recent works</h2>
		<hr />
		<!-- Looping through the list of posts with svelte's {#each} syntax ref: https://svelte.dev/tutorial/each-blocks -->
		<div class="posts">
			{#each posts as post}
				<a href={post.metadata.slug}>
					<div class="grid grid-cols-3">
						<h3>
							{post.metadata.title}
						</h3>
						<span>
							{post.metadata.type}
						</span>
						<span>{post.metadata.date}</span>
					</div>
				</a>
			{/each}
		</div>
	</section>
</div>

<!-- All the styling within .svelte files is scoped. Meaning any CSS in this file doesn't effect rest of the files -->
<style>
	.posts {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}
	.post {
		display: flex;
		justify-content: space-between;
		gap: 2em;
		align-items: center;
	}
	#container {
		display: flex;
		flex-direction: column;
		gap: 3em;
	}
</style>
