import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { knowledge } from '@/content';
import { queryKnowledge } from '@/search';
import type { KnowledgeItem, KnowledgeKind } from '@/types';

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

function rowFor(item: KnowledgeItem): HTMLElement {
  const meta = [kindLabel(item.kind), item.featured ? 'Featured' : null]
    .filter(Boolean)
    .join(' · ');

  return ModuleRow({
    title: item.title,
    description: item.summary || undefined,
    meta,
    href: `/knowledge/${item.slug}`,
  });
}

const page: PageModule = {
  title: 'Knowledge',
  description: 'Engineering decisions, architecture notes, and lessons',
  render() {
    if (!knowledge.length) {
      return AppShell({
        title: 'Knowledge',
        description: 'How products are designed, built, and improved.',
        children: el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Knowledge']),
            el('div', { className: 'module__rail-end' }, [
              el('a', { className: 'module__action', href: '/products' }, ['Products']),
            ]),
          ]),
          el('div', { className: 'module__body' }, [
            SparseState(
              'Engineering notes will appear here as products evolve.',
              'Explore Products for what is already documented.',
            ),
          ]),
        ]),
      });
    }

    const listHost = el('div', { className: 'module__body' });
    const status = el('p', {
      className: 'muted tabular',
      'aria-live': 'polite',
    }, [`${knowledge.length} entries`]);

    function renderList(items: KnowledgeItem[], emptyMessage: string): void {
      listHost.replaceChildren();
      if (!items.length) {
        listHost.append(
          SparseState(emptyMessage, 'Try another term, or browse Products.'),
        );
        status.textContent = 'No matches';
        return;
      }
      listHost.append(ModuleList(items.map(rowFor)));
      status.textContent = `${items.length} ${items.length === 1 ? 'entry' : 'entries'}`;
    }

    const input = el('input', {
      type: 'search',
      id: 'knowledge-search',
      name: 'q',
      placeholder: 'Search titles, tags, topics…',
      autocomplete: 'off',
      'aria-label': 'Search knowledge',
    }) as HTMLInputElement;

    input.addEventListener('input', () => {
      const q = input.value.trim();
      if (!q) {
        renderList(knowledge, '');
        return;
      }
      renderList(
        queryKnowledge(q),
        'No entries match that question.',
      );
    });

    renderList(knowledge, '');

    return AppShell({
      title: 'Knowledge',
      description: 'Engineering decisions, architecture notes, and lessons from building products.',
      children: [
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Search']),
          ]),
          el('div', { className: 'module__body' }, [
            el('div', { className: 'field' }, [
              el('label', { for: 'knowledge-search', className: 'sr-only' }, [
                'Search knowledge',
              ]),
              input,
            ]),
            status,
          ]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Entries']),
          ]),
          listHost,
        ]),
      ],
    });
  },
};

export default page;
