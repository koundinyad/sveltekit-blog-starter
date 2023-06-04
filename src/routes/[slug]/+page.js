import { error } from '@sveltejs/kit';

export function load({ params }) {
	const { slug } = params;
	const postsModules = import.meta.glob('../../posts/*.md', { eager: true });

	let posts = Object.values(postsModules);

	// Filtering for current post item
	const post = posts.filter((post) => post.metadata.slug === slug)[0];

	if (!post) {
		throw error(404, 'This page does not exist');
	} else {
		return {
			post
		};
	}
}
