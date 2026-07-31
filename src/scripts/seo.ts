import { site, social } from '@/content';

export function setTheme(theme: 'dark' | 'light'): void {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.setAttribute('content', theme === 'dark' ? '#0c0e11' : '#f3f5f7');
  }
}

export function initTheme(): 'dark' | 'light' {
  const stored = localStorage.getItem('theme');
  const theme = stored === 'light' || stored === 'dark' ? stored : 'dark';
  setTheme(theme);
  return theme;
}

export function toggleTheme(): 'dark' | 'light' {
  const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
}

export function updateMeta(options: { title: string; description?: string; path?: string }): void {
  const title = options.title.includes(site.name)
    ? options.title
    : `${options.title} — ${site.name}`;
  document.title = title;

  upsertMeta('name', 'description', options.description || site.meta.description);
  upsertMeta('property', 'og:title', title);
  upsertMeta('property', 'og:description', options.description || site.meta.description);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', site.name);
  upsertMeta('property', 'og:image', new URL(site.meta.ogImage, `https://${site.domain}`).toString());
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', title);
  upsertMeta('name', 'twitter:description', options.description || site.meta.description);
  upsertMeta('name', 'twitter:image', new URL(site.meta.ogImage, `https://${site.domain}`).toString());
  if (site.meta.twitterHandle) {
    upsertMeta('name', 'twitter:site', `@${site.meta.twitterHandle.replace(/^@/, '')}`);
  }

  const canonicalHref = `https://${site.domain}${options.path || '/'}`;
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.append(canonical);
  }
  canonical.href = canonicalHref;
  upsertMeta('property', 'og:url', canonicalHref);
}

function upsertMeta(
  attr: 'name' | 'property',
  key: string,
  content: string,
): void {
  let node = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!node) {
    node = document.createElement('meta');
    node.setAttribute(attr, key);
    document.head.append(node);
  }
  node.content = content;
}

export function ensureJsonLd(): void {
  const id = 'site-jsonld';
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = id;
    document.head.append(script);
  }

  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    jobTitle: site.title,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karnal',
      addressRegion: 'HR',
      addressCountry: 'IN',
    },
    url: `https://${site.domain}/`,
    sameAs: social.map((link) => link.url),
  });
}
