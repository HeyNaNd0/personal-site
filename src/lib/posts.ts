import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** Drafts are hidden in production builds but visible in `npm run dev`. */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => import.meta.env.DEV || !data.draft);
  // Dated posts newest-first, then "coming soon" posts.
  return posts.sort((a, b) => {
    if (a.data.upcoming !== b.data.upcoming) return a.data.upcoming ? 1 : -1;
    return (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0);
  });
}

export const isExternal = (post: Post) => Boolean(post.data.external);

/** Posts that get their own page on this site. */
export const isLocal = (post: Post) => !post.data.external && !post.data.upcoming;

/** Where a post links to: its external URL, its page here, or nowhere (upcoming). */
export function postHref(post: Post): string | null {
  if (post.data.upcoming) return null;
  if (post.data.external) return post.data.external;
  return `/blog/${post.id}/`;
}
