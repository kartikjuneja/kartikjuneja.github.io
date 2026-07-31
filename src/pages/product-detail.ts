import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { getProduct } from '@/content';
import { renderMarkdown } from '@/content/markdown';
import type { Product } from '@/types';

const SECTION_ORDER = [
  'overview',
  'problem',
  'solution',
  'architecture',
  'technology',
  'lessons-learned',
  'timeline',
  'roadmap',
  'future',
  'screenshots',
];

const SECTION_TITLES: Record<string, string> = {
  overview: 'Overview',
  problem: 'Problem',
  solution: 'Solution',
  architecture: 'Architecture',
  technology: 'Technology',
  'lessons-learned': 'Lessons Learned',
  timeline: 'Timeline',
  roadmap: 'Roadmap',
  future: 'Future',
  screenshots: 'Screenshots',
};

function isEmptySection(raw: string | undefined): boolean {
  const text = raw?.trim() ?? '';
  if (!text) return true;
  if (/^not published\.?$/i.test(text)) return true;
  if (/^further .+ is not published\.?$/i.test(text)) return true;
  return false;
}

function contextModule(product: Product): HTMLElement {
  const rows: HTMLElement[] = [];

  if (product.type === 'professional') {
    rows.push(
      ModuleRow({
        title: 'Professional Case Study',
        description: 'Employer or client delivery — not an independently owned product.',
      }),
    );
    if (product.employer) {
      rows.push(ModuleRow({ title: 'Employer', description: product.employer }));
    }
    if (product.client) {
      rows.push(ModuleRow({ title: 'Client', description: product.client }));
    }
    if (product.role) {
      rows.push(ModuleRow({ title: 'Role', description: product.role }));
    }
  } else if (product.type === 'research') {
    rows.push(
      ModuleRow({
        title: 'Research',
        description: 'Exploration — not a shipped product claim.',
      }),
    );
  } else {
    rows.push(
      ModuleRow({
        title: 'Independent Product',
        description: 'Built outside employer delivery.',
      }),
    );
  }

  return el('section', { className: 'module' }, [
    el('header', { className: 'module__rail' }, [
      el('h2', { className: 'module__title' }, ['Context']),
    ]),
    el('div', { className: 'module__body' }, [ModuleList(rows)]),
  ]);
}

function statusModule(product: Product): HTMLElement {
  const fromMarkdown = product.sections['current-status'];
  if (!isEmptySection(fromMarkdown)) {
    const prose = el('div', { className: 'prose' });
    html(prose, renderMarkdown(fromMarkdown!));
    return el('section', { className: 'module' }, [
      el('header', { className: 'module__rail' }, [
        el('h2', { className: 'module__title' }, ['Current Status']),
      ]),
      el('div', { className: 'module__body' }, [prose]),
    ]);
  }

  const line =
    product.type === 'professional'
      ? `${product.status} — professional delivery${product.employer ? ` at ${product.employer}` : ''}.`
      : `${product.status}.`;

  return el('section', { className: 'module' }, [
    el('header', { className: 'module__rail' }, [
      el('h2', { className: 'module__title' }, ['Current Status']),
    ]),
    el('div', { className: 'module__body' }, [
      el('p', { className: 'module-row__description' }, [line]),
    ]),
  ]);
}

function linksModule(product: Product): HTMLElement | null {
  const entries: Array<{ label: string; href: string }> = [];
  if (product.links.website) entries.push({ label: 'Website', href: product.links.website });
  if (product.links.repository) {
    entries.push({ label: 'Repository', href: product.links.repository });
  }
  if (product.links.demo) entries.push({ label: 'Demo', href: product.links.demo });
  if (!entries.length) return null;

  return el('section', { className: 'module' }, [
    el('header', { className: 'module__rail' }, [
      el('h2', { className: 'module__title' }, ['Links']),
    ]),
    el('div', { className: 'module__body' }, [
      ModuleList(
        entries.map((entry) =>
          ModuleRow({
            title: entry.label,
            description: entry.href,
            href: entry.href,
          }),
        ),
      ),
    ]),
  ]);
}

export function create(slug: string): PageModule {
  const product = getProduct(slug);

  return {
    title: product?.title ?? 'Not found',
    description: product?.summary ?? 'Product',
    render() {
      if (!product) {
        return AppShell({
          title: 'Not found',
          children: SparseState('This product does not exist.'),
        });
      }

      const known = new Set(SECTION_ORDER);
      const extra = Object.keys(product.sections).filter(
        (key) => !known.has(key) && key !== 'current-status' && key !== 'links',
      );
      const order = [...SECTION_ORDER, ...extra];

      const storySections = order
        .filter((key) => !isEmptySection(product.sections[key]))
        .map((key) => {
          const prose = el('div', { className: 'prose' });
          html(prose, renderMarkdown(product.sections[key]!));
          return el('section', { className: 'module' }, [
            el('header', { className: 'module__rail' }, [
              el('h2', { className: 'module__title' }, [SECTION_TITLES[key] ?? key]),
            ]),
            el('div', { className: 'module__body' }, [prose]),
          ]);
        });

      const links = linksModule(product);
      const children: HTMLElement[] = [
        el('p', { className: 'module-row__title' }, [product.summary]),
        contextModule(product),
        ...storySections,
        statusModule(product),
      ];
      if (links) children.push(links);

      if (!storySections.length) {
        children.push(SparseState('Story details are not published for this entry.'));
      }

      return AppShell({
        title: product.title,
        description:
          product.type === 'professional'
            ? 'Professional case study'
            : product.type === 'research'
              ? 'Research'
              : 'Independent product',
        children,
      });
    },
  };
}
