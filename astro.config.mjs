// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  // Canonical origin — used for canonical URLs, Open Graph, sitemap, and RSS.
  site: "https://ericops.cloud",

  // Pages build to /path/index.html; Azure SWA ("trailingSlash": "auto") serves them at /path/.
  trailingSlash: "ignore",

  // Keep normal HTML whitespace rules (Astro 7 defaults to JSX-style collapsing).
  compressHTML: true,

  build: {
    // Emit every stylesheet as a file so the CSP can stay at style-src 'self'.
    inlineStylesheets: "never",
  },

  markdown: {
    // Prism highlights with CSS classes; Shiki (the default) uses inline styles the CSP would block.
    syntaxHighlight: "prism",
  },

  vite: {
    build: {
      // Never inline scripts or assets as data/inline tags — keeps script-src 'self' strict.
      assetsInlineLimit: 0,
    },
  },

  integrations: [
    sitemap({
      filter: (page) => !page.includes("/404"),
    }),
  ],
});
