import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { SITE } from "../data/site";
import { getPublishedPosts, postHref } from "../lib/posts";

export async function GET(context: APIContext) {
  const posts = (await getPublishedPosts()).filter((p) => !p.data.upcoming && p.data.date);

  return rss({
    title: `${SITE.name} — Blog`,
    description: "Notes on Kubernetes, AKS, and production troubleshooting.",
    site: context.site ?? SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postHref(post) ?? "/",
      categories: post.data.tags,
    })),
    customData: "<language>en-us</language>",
  });
}
