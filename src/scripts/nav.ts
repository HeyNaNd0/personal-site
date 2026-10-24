// Progressive enhancement only: the page works fully without this script.
// 1) Adds a hairline under the header once the page scrolls.
// 2) Highlights the nav link for the section currently in view.

const header = document.querySelector<HTMLElement>("[data-site-header]");

if (header) {
  const onScroll = () => header.toggleAttribute("data-scrolled", window.scrollY > 40);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

const links = new Map<string, HTMLAnchorElement>();
document.querySelectorAll<HTMLAnchorElement>("[data-nav-link]").forEach((a) => {
  links.set(a.dataset.navLink ?? "", a);
});

const sections = [...links.keys()]
  .map((id) => document.getElementById(id))
  .filter((el): el is HTMLElement => el !== null);

if (sections.length > 0 && "IntersectionObserver" in window) {
  const setActive = (id: string) => {
    links.forEach((a, key) => {
      if (key === id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActive(entry.target.id);
      }
    },
    // A section counts as "current" when it crosses the upper-middle of the viewport.
    { rootMargin: "-35% 0px -55% 0px" },
  );

  sections.forEach((s) => observer.observe(s));
}
