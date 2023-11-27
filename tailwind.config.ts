import { fontFamily } from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        burgundy: '#780115',
        flame: '#d7572a',
        sand: '#ffb564',
        sunset: '#ffd19d',
        olive: '#918450',
        fantasy: '#faf4ef',
      },
      fontFamily: {
        mono: ['"Press Start 2P"', ...fontFamily.mono],
        condensed: ['Pizel', ...fontFamily.mono],
      },
    },
  },
  plugins: [forms()],
};
