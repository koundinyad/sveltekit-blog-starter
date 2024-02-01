/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],

	plugins: [require('flowbite/plugin')],

	darkMode: 'class',
	
	theme: {
		fontFamily: {
			sans: ['"Kosugi Maru"', "sans-serif"],
			serif: ['IPAMincho', "serif"],
		  },
		extend: {
			colors: {
				black: "#1e1e1e",
				cream: "#FEFFF6",
				pink: "#fc4e51",
			  },
		}
	},
	plugins: []
};
