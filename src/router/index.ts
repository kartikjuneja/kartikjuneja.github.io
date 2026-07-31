import { routes } from '@/router/routes';
import { matchRoute, normalizePath, type PageModule } from '@/router/types';

type RouterHooks = {
  onNavigate: (page: PageModule, path: string) => void | Promise<void>;
  onNotFound: (path: string) => void | Promise<void>;
};

export function createRouter(hooks: RouterHooks) {
  let currentPath = '';

  async function render(pathname: string): Promise<void> {
    const path = normalizePath(pathname);
    currentPath = path;

    const matched = matchRoute(path, routes);
    if (!matched) {
      await hooks.onNotFound(path);
      return;
    }

    const page =
      'path' in matched.route
        ? await matched.route.load()
        : await matched.route.load(matched.params);

    if (currentPath !== path) return;
    await hooks.onNavigate(page, path);
  }

  function navigate(href: string, options: { replace?: boolean } = {}): void {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) {
      window.location.assign(href);
      return;
    }

    const next = normalizePath(url.pathname) + url.search + url.hash;
    const method = options.replace ? 'replaceState' : 'pushState';
    window.history[method]({}, '', next);
    void render(url.pathname);
  }

  function handleClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    const anchor = target?.closest('a[href]') as HTMLAnchorElement | null;
    if (!anchor) return;
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (anchor.target && anchor.target !== '_self') return;
    if (anchor.hasAttribute('download')) return;

    const url = new URL(anchor.href, window.location.origin);
    if (url.origin !== window.location.origin) return;

    event.preventDefault();
    navigate(url.pathname + url.search + url.hash);
  }

  function start(): void {
    document.addEventListener('click', handleClick);
    window.addEventListener('popstate', () => {
      void render(window.location.pathname);
    });
    void render(window.location.pathname);
  }

  return { start, navigate, render };
}

export type Router = ReturnType<typeof createRouter>;
