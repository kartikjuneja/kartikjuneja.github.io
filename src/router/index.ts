import { redirects, routes } from '@/router/routes';
import { matchRoute, normalizePath, type PageModule } from '@/router/types';

type RouterHooks = {
  onNavigate: (page: PageModule, path: string) => void | Promise<void>;
  onNotFound: (path: string) => void | Promise<void>;
};

function applyRedirect(pathname: string): { pathname: string; hash: string; redirected: boolean } {
  const path = normalizePath(pathname);
  const target = redirects[path];
  if (!target) {
    return { pathname: path, hash: '', redirected: false };
  }

  const url = new URL(target, window.location.origin);
  return {
    pathname: normalizePath(url.pathname),
    hash: url.hash,
    redirected: true,
  };
}

export function createRouter(hooks: RouterHooks) {
  let currentPath = '';

  async function render(pathname: string): Promise<void> {
    const redirected = applyRedirect(pathname);
    let path = redirected.pathname;

    if (redirected.redirected) {
      const next = path + redirected.hash;
      window.history.replaceState({}, '', next);
    }

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

    const redirected = applyRedirect(url.pathname);
    const path = redirected.pathname;
    const hash = redirected.redirected ? redirected.hash : url.hash;
    const next = path + url.search + hash;
    const method = options.replace || redirected.redirected ? 'replaceState' : 'pushState';
    window.history[method]({}, '', next);
    void render(path);
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
