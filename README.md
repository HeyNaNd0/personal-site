# ericops.cloud

Personal site for Eric Fernandez — Cloud Infrastructure Engineer & Kubernetes (AKS) specialist.

**Live:** [https://ericops.cloud](https://ericops.cloud)

## Stack

- [Astro 7](https://astro.build) — every page is prebuilt static HTML; ~1 KB of JavaScript total
- Terminal design: the page reads as one shell session (`whoami`, `kubectl get experience`, `ls -l projects/`)
- Self-hosted IBM Plex Mono — no third-party requests
- Azure Static Web Apps (Free tier), deployed by GitHub Actions
- Node 24 (see `.nvmrc`)

## Edit the content

Almost everything lives in one file: **`src/data/site.ts`** — experience, projects, skills, links, and the search-engine description.
The page, the structured data Google reads, and the link previews all come from it.

> Honesty rule for `site.ts`: only list skills and certifications that are earned.

| To change… | Edit |
|---|---|
| Jobs, projects, skills, About text | `src/data/site.ts` |
| Page title / Google description | `SITE.title` / `SITE.description` in `src/data/site.ts` |
| Look and feel | `src/styles/global.css` (colors, prompt, page-load sequence) + the `<style>` block in each `src/components/*.astro` |
| How a job reads in `kubectl get experience` | the `kube` field on each job in `src/data/site.ts` |
| Link-preview image | `public/og.png` (1200×630) |
| Security headers, caching, 404 | `public/staticwebapp.config.json` |

## Write a blog post

1. Copy `src/content/posts/_template.md` to `src/content/posts/my-post-name.md`.
2. Fill in the frontmatter and write Markdown below it.
3. Push. It becomes **`/blog/my-post-name/`**, appears in the Blog section, the sitemap, and the RSS feed.

Posts hosted elsewhere (e.g. Medium) use `external: "<url>"` and no body. `upcoming: true` shows "Coming soon".
Posts on this domain build search ranking for the site; external posts build it for the other site.

## Local development

```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # outputs dist/
npm run preview   # serve the built site
```

## Deployment

| Event | What happens |
|---|---|
| Pull request to `main` | Builds and deploys a **preview URL** (posted as a PR comment) |
| Merge / push to `main` | Builds and deploys to production |
| PR closed | Preview environment is deleted |

The workflow installs with `npm ci --ignore-scripts`, pins every action to a commit SHA, and runs with read-only permissions except where noted. Dependabot proposes dependency updates weekly (with a 7-day cooldown on new releases).

## SEO checklist

Built in: crawlable HTML, title/description, canonical URL, Open Graph + Twitter cards, `Person` structured data, `sitemap-index.xml`, `robots.txt`, RSS (`/rss.xml`).

Manual, one-time:

- [ ] [Google Search Console](https://search.google.com/search-console): add `ericops.cloud` (DNS TXT record), submit `https://ericops.cloud/sitemap-index.xml`, request indexing for `/`
- [ ] [Bing Webmaster Tools](https://www.bing.com/webmasters): import the site from Search Console
- [ ] LinkedIn → Contact info → Website: `https://ericops.cloud`
- [ ] Medium profile → link to `https://ericops.cloud`

## Author

**Eric Fernandez** — AKS Escalation Engineer @ Microsoft · U.S. Navy veteran

- [LinkedIn](https://www.linkedin.com/in/heyfern)
- [GitHub](https://github.com/HeyNaNd0)
- [Email](mailto:eric.fernandez4@gmail.com)
