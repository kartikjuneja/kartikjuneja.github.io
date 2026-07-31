import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell, SparseState } from '@/components/module';
import { getArticle } from '@/content';

export function create(slug: string): PageModule {
  const article = getArticle(slug);

  return {
    title: article?.title ?? 'Article not found',
    description: article?.description ?? '',
    render() {
      if (!article) {
        return AppShell({
          title: 'Article not found',
          children: SparseState('This article does not exist.'),
        });
      }

      const prose = el('div', { className: 'prose' });
      html(prose, article.bodyHtml);

      return AppShell({
        title: article.title,
        description: article.description || undefined,
        children: el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, [article.status || 'Note']),
          ]),
          el('div', { className: 'module__body' }, [prose]),
        ]),
      });
    },
  };
}
