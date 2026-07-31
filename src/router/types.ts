export type PageModule = {
  title: string;
  description?: string;
  render: () => HTMLElement | Promise<HTMLElement>;
};

export type Route =
  | {
      path: string;
      load: () => Promise<PageModule>;
    }
  | {
      pattern: RegExp;
      load: (params: Record<string, string>) => Promise<PageModule>;
    };

export function matchRoute(
  pathname: string,
  routes: Route[],
): { route: Route; params: Record<string, string> } | null {
  const path = normalizePath(pathname);

  for (const route of routes) {
    if ('path' in route && route.path === path) {
      return { route, params: {} };
    }

    if ('pattern' in route) {
      const match = path.match(route.pattern);
      if (match?.groups) {
        return { route, params: match.groups };
      }
    }
  }

  return null;
}

export function normalizePath(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '') || '/';
}
