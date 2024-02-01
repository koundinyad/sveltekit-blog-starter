import { writable } from 'svelte/store';

const image = writable("/favicon.png");

export { image };