import { el } from '@/components/dom';

export type ModuleSpan = 4 | 6 | 8 | 12;

export type ModuleShellOptions = {
  title: string;
  meta?: string;
  action?: { label: string; href: string };
  body: HTMLElement | HTMLElement[];
  footer?: HTMLElement | null;
  state?: 'ready' | 'loading' | 'error';
};

export function ModuleShell(options: ModuleShellOptions): HTMLElement {
  const bodyChildren = Array.isArray(options.body) ? options.body : [options.body];
  const stateClass =
    options.state === 'loading'
      ? ' module--loading'
      : options.state === 'error'
        ? ' module--error'
        : '';

  const railEndChildren: Array<Node | string | null | undefined> = [];
  if (options.meta) {
    railEndChildren.push(el('span', { className: 'module__meta tabular' }, [options.meta]));
  }
  if (options.action) {
    railEndChildren.push(
      el('a', { className: 'module__action', href: options.action.href }, [options.action.label]),
    );
  }

  return el('section', { className: `module${stateClass}` }, [
    el('header', { className: 'module__rail' }, [
      el('h2', { className: 'module__title' }, [options.title]),
      railEndChildren.length
        ? el('div', { className: 'module__rail-end' }, railEndChildren)
        : null,
    ]),
    el('div', { className: 'module__body' }, bodyChildren),
    options.footer ? el('div', { className: 'module__footer' }, [options.footer]) : null,
  ]);
}

export function SparseState(line: string, hint?: string): HTMLElement {
  return el('div', { className: 'module-sparse' }, [
    el('p', { className: 'module-sparse__line' }, [line]),
    hint ? el('p', { className: 'module-sparse__hint' }, [hint]) : null,
  ]);
}

export function ModuleLoading(label = 'Loading…'): HTMLElement {
  return el('p', { className: 'module-status', role: 'status' }, [label]);
}

export function ModuleError(label = 'Something went wrong.'): HTMLElement {
  return el('p', { className: 'module-status', role: 'alert' }, [label]);
}

export type ModuleRowOptions = {
  title: string;
  description?: string;
  meta?: string;
  href?: string;
};

export function ModuleRow(options: ModuleRowOptions): HTMLElement {
  const main = el('div', {}, [
    el('p', { className: 'module-row__title' }, [options.title]),
    options.description
      ? el('p', { className: 'module-row__description' }, [options.description])
      : null,
  ]);

  const children: Array<Node | string | null | undefined> = [main];
  if (options.meta) {
    children.push(el('span', { className: 'module-row__meta' }, [options.meta]));
  }

  const className = options.meta ? 'module-row' : 'module-row module-row--solo';

  if (options.href) {
    return el('a', { className, href: options.href }, children);
  }

  return el('div', { className }, children);
}

export function ModuleList(rows: HTMLElement[]): HTMLElement {
  return el('div', { className: 'module-list' }, rows);
}

export function HomeGrid(
  items: Array<{ span: ModuleSpan; node: HTMLElement; priority?: string }>,
): HTMLElement {
  return el('div', { className: 'home-grid' }, [
    el('h1', { className: 'sr-only' }, ['Home']),
    ...items.map((item) =>
      el(
        'div',
        {
          className: `home-grid__item home-grid__item--span-${item.span}`,
          'data-priority': item.priority,
        },
        [item.node],
      ),
    ),
  ]);
}

export function AppShell(options: {
  title: string;
  description?: string;
  children: HTMLElement | HTMLElement[];
}): HTMLElement {
  const body = Array.isArray(options.children) ? options.children : [options.children];
  return el('div', { className: 'app-shell' }, [
    el('header', { className: 'app-shell__header' }, [
      el('h1', { className: 'app-shell__title' }, [options.title]),
      options.description
        ? el('p', { className: 'app-shell__description' }, [options.description])
        : null,
    ]),
    el('div', { className: 'app-shell__body' }, body),
  ]);
}
