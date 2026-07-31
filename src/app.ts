import {
  createEnvironmentChrome,
  createEnvironmentFooter,
} from '@/components/environment';
import { createSystemLauncher } from '@/components/launcher';
import { el } from '@/components/dom';
import { site } from '@/content';
import { createRouter } from '@/router';
import notFoundPage from '@/pages/not-found';
import { ensureJsonLd, initTheme, toggleTheme, updateMeta } from '@/scripts/seo';
import type { PageModule } from '@/router/types';

export function startApp(root: HTMLElement): void {
  initTheme();
  ensureJsonLd();

  const skip = el('a', { className: 'skip-link', href: '#main' }, ['Skip to content']);
  const main = el('main', {
    className: 'env-main',
    id: 'main',
    tabindex: '-1',
  });

  const chrome = createEnvironmentChrome({
    name: site.name,
    role: site.title,
  });

  const launcher = createSystemLauncher({
    onNavigate: (url) => router.navigate(url),
  });

  chrome.setLauncherHandler(() => launcher.toggle());
  chrome.setThemeHandler(() => toggleTheme());

  const footer = createEnvironmentFooter(
    `© ${new Date().getFullYear()} ${site.name}`,
    'Ctrl+K to navigate',
  );

  const router = createRouter({
    async onNavigate(page, path) {
      await mountPage(page, path);
    },
    async onNotFound(path) {
      await mountPage(notFoundPage, path);
    },
  });

  let booted = false;

  async function mountPage(page: PageModule, path: string): Promise<void> {
    updateMeta({
      title: page.title,
      description: page.description,
      path,
    });

    const isHome = path === '/';
    chrome.setMode(isHome ? { kind: 'home' } : { kind: 'app', title: page.title });

    const content = await page.render();
    main.replaceChildren(content);
    window.scrollTo({ top: 0, behavior: 'auto' });

    if (booted && !launcher.isOpen()) {
      main.focus({ preventScroll: true });
    }
    booted = true;
  }

  root.replaceChildren(skip, chrome.element, main, footer, launcher.element);

  document.addEventListener('keydown', (event) => {
    const key = event.key.toLowerCase();
    if ((event.ctrlKey || event.metaKey) && key === 'k') {
      event.preventDefault();
      launcher.toggle();
    }
    if (key === 'escape' && launcher.isOpen()) {
      event.preventDefault();
      launcher.close();
    }
  });

  router.start();
}
