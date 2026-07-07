// @ts-check
import { defineConfig } from "astro/config";

import mdx from "@astrojs/mdx";

import icon from "astro-icon";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({ mode: "standalone" }),
  compressHTML: true,
  site: "https://rafacalvodev.com",
  integrations: [mdx(), icon()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          logger: {
            warn: () => {},
          },
        },
      },
    },
  },
});
