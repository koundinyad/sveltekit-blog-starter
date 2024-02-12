import { writable } from 'svelte/store';

const image = writable("/images/default.webp");
const projectContent = writable("");

export { image, projectContent  };