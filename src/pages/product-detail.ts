import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell, SparseState } from '@/components/module';
import { getProduct } from '@/content';
import { renderMarkdown } from '@/content/markdown';

const SECTION_ORDER = [
  'overview',
  'problem',
  'solution',
  'architecture',
  'technology',
  'lessons-learned',
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
  future: 'Future',
  screenshots: 'Screenshots',
};

export function create(slug: string): PageModule {
  const product = getProduct(slug);

  return {
    title: product?.name ?? 'Product not found',
    description: product?.description ?? 'Product case study',
    render() {
      if (!product) {
        return AppShell({
          title: 'Product not found',
          children: SparseState('This product does not exist.'),
        });
      }

      const known = new Set(SECTION_ORDER);
      const extra = Object.keys(product.sections).filter((key) => !known.has(key));
      const order = [...SECTION_ORDER, ...extra];

      const sections = order.map((key) => {
        const raw = product.sections[key]?.trim() || 'Not published.';
        const prose = el('div', { className: 'prose' });
        html(prose, renderMarkdown(raw));
        return el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, [SECTION_TITLES[key] ?? key]),
          ]),
          el('div', { className: 'module__body' }, [prose]),
        ]);
      });

      return AppShell({
        title: product.name,
        description: product.description || '—',
        children: [
          el('p', { className: 'muted tabular' }, [
            [product.status, product.technology.join(' · ')].filter(Boolean).join(' · ') || '—',
          ]),
          ...sections,
        ],
      });
    },
  };
}
