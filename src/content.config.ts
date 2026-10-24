import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Blog posts live in src/content/posts/*.md.
 * - A post with a body (and no `external`) becomes its own page at /blog/<file-name>/.
 * - A post with `external` links out (e.g. Medium) and has no body.
 * - `upcoming: true` shows as "Coming soon" and is left out of the sitemap and RSS.
 * Files starting with "_" are ignored (use them for templates).
 */
const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date().optional(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    external: z.url().optional(),
    upcoming: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts };
