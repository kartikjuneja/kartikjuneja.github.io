import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { articles } from '@/content';

const page: PageModule = {
  title: 'Writing',
  description: 'Articles and notes',
  render() {
    const body = articles.length
      ? ModuleList(
          articles.map((article) =>
            ModuleRow({
              title: article.title,
              description: article.description || undefined,
              meta: article.date || article.status,
              href: `/writing/${article.slug}`,
            }),
          ),
        )
      : SparseState('No notes yet.');

    return AppShell({
      title: 'Writing',
      description: 'Notes and articles.',
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Notes']),
        ]),
        el('div', { className: 'module__body' }, [body]),
      ]),
    });
  },
};

export default page;
