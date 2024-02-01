import { writable } from 'svelte/store';

const image = writable("src/lib/images/default.webp");

export { image };