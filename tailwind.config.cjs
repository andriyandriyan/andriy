/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#e4e9f0',
					100: '#bcc9da',
					200: '#8fa5c1',
					300: '#6281a8',
					400: '#406695',
					500: '#1e4b82',
					600: '#1a447a',
					700: '#163b6f',
					800: '#123365',
					900: '#0a2352',
				},
			},
		},
	},
	plugins: [],
}
