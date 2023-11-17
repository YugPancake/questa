import { fontFamily } from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				burgundy: '#780115',
				flame: '#d7572a',
				'sand-brown': '#ffb564',
				sunset: '#ffd19d',
				olive: '#918450'
			}
		},
		fontFamily: {
      mono: ['Press Start', ...fontFamily.mono],
    },
	},
	plugins: []
};
