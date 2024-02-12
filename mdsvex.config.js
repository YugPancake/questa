import { defineMDSveXConfig as defineConfig } from 'mdsvex';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

const config = defineConfig({
  extensions: ['.svelte.md', '.md', '.svx'],

  smartypants: {
    dashes: 'oldschool',
  },

  remarkPlugins: [[remarkToc, { tight: true }]],
  rehypePlugins: [rehypeSlug],

  layout: {
    default: './src/layouts/default.svelte',
  },
});

export default config;
