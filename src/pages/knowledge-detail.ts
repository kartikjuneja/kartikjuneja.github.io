import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell, SparseState } from '@/components/module';
import { getKnowledge } from '@/content';
import { renderMarkdown } from '@/content/markdown';
import type { KnowledgeKind } from '@/types';

const SECTION_ORDER = [
  'overview',
  'context',
  'problem',
  'decision',
  'alternatives',
  'trade-offs',
  'tradeoffs',
  'outcome',
  'references',
];

const SECTION_TITLES: Record<string, string> = {
  overview: 'Overview',
  context: 'Context',
  problem: 'Problem',
  decision: 'Decision',
  alternatives: 'Alternatives',
  'trade-offs': 'Trade-offs',
  tradeoffs: 'Trade-offs',
  outcome: 'Outcome',
  references: 'References',
};

function kindLabel(kind: KnowledgeKind): string {
  switch (kind) {
    case 'architecture':
      return 'Architecture';
    case 'note':
      return 'Engineering Notes';
    case 'lesson':
      return 'Lessons Learned';
    case 'review':
      return 'Reviews';
    case 'decision':
      return 'Decisions';
    default:
      return 'Articles';
  }
}

function isEmptySection(raw: string | undefined): boolean {
  const text = raw?.trim() ?? '';
  if (!text) return true;
  if (/^not published\.?$/i.test(text)) return true;
  return false;
}

export function create(slug: string): PageModule {
  const item = getKnowledge(slug);

  return {
    title: item?.title ?? 'Not found',
    description: item?.summary ?? 'Knowledge entry',
    render() {
      if (!item) {
        return AppShell({
          title: 'Not found',
          children: SparseState(
            'This entry does not exist.',
            'Return to Knowledge or explore Products.',
          ),
        });
      }

      const known = new Set(SECTION_ORDER);
      const extra = Object.keys(item.sections).filter((key) => !known.has(key));
      const order = [...SECTION_ORDER, ...extra];

      const storySections = order
        .filter((key) => !isEmptySection(item.sections[key]))
        // Prefer canonical trade-offs key if both exist
        .filter((key, _, all) => !(key === 'tradeoffs' && all.includes('trade-offs')))
        .map((key) => {
          const prose = el('div', { className: 'prose' });
          html(prose, renderMarkdown(item.sections[key]!));
          return el('section', { className: 'module' }, [
            el('header', { className: 'module__rail' }, [
              el('h2', { className: 'module__title' }, [SECTION_TITLES[key] ?? key]),
            ]),
            el('div', { className: 'module__body' }, [prose]),
          ]);
        });

      const metaBits = [
        kindLabel(item.kind),
        item.featured ? 'Featured' : null,
        item.date,
      ].filter(Boolean);

      const topicLine =
        item.topics.length || item.tags.length
          ? el('p', { className: 'muted' }, [
              [...item.topics, ...item.tags].join(' · '),
            ])
          : null;

      const children: HTMLElement[] = [
        el('p', { className: 'module-row__title' }, [item.summary]),
        el('p', { className: 'muted tabular' }, [metaBits.join(' · ')]),
      ];
      if (topicLine) children.push(topicLine);

      if (storySections.length) {
        children.push(...storySections);
      } else if (item.bodyHtml.trim()) {
        // Fallback when authors wrote prose without ## sections
        const prose = el('div', { className: 'prose' });
        html(prose, item.bodyHtml);
        children.push(
          el('section', { className: 'module' }, [
            el('header', { className: 'module__rail' }, [
              el('h2', { className: 'module__title' }, ['Overview']),
            ]),
            el('div', { className: 'module__body' }, [prose]),
          ]),
        );
      } else {
        children.push(
          SparseState('This entry has no published sections yet.'),
        );
      }

      return AppShell({
        title: item.title,
        description: kindLabel(item.kind),
        children,
      });
    },
  };
}
