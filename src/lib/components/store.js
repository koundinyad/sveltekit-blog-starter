import { writable } from 'svelte/store';

const image = writable("/images/default.webp");

export { image };