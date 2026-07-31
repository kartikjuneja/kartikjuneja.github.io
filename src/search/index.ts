import type { SearchItem } from '@/types';
import {
  articles,
  experiments,
  navigation,
  products,
  services,
} from '@/content';

/**
 * Build-time searchable corpus.
 * Command palette and future static search (e.g. Pagefind) should consume this shape.
 * Emit or transform this array in a build script when adding an external indexer —
 * page components should not change.
 */
export function buildSearchIndex(): SearchItem[] {
  const items: SearchItem[] = [];

  for (const item of navigation.primary) {
    items.push({
      id: `page:${item.path}`,
      title: item.label,
      description: item.description ?? '',
      type: 'page',
      url: item.path,
      tags: ['page', 'navigation'],
      body: `${item.label} ${item.description ?? ''}`,
    });
  }

  for (const product of products) {
    items.push({
      id: `product:${product.slug}`,
      title: product.name,
      description: product.description,
      type: 'product',
      url: `/products/${product.slug}`,
      tags: ['product', product.status, ...product.technology],
      body: `${product.name} ${product.description} ${product.technology.join(' ')} ${Object.values(product.sections).join(' ')}`,
    });
  }

  for (const article of articles) {
    items.push({
      id: `article:${article.slug}`,
      title: article.title,
      description: article.description,
      type: 'article',
      url: `/writing/${article.slug}`,
      tags: ['article', article.status],
      body: `${article.title} ${article.description}`,
    });
  }

  for (const service of services) {
    items.push({
      id: `service:${service.id}`,
      title: service.name,
      description: service.description,
      type: 'service',
      url: '/services',
      tags: ['service'],
      body: `${service.name} ${service.description}`,
    });
  }

  for (const experiment of experiments) {
    items.push({
      id: `experiment:${experiment.slug}`,
      title: experiment.title,
      description: experiment.description,
      type: 'experiment',
      url: `/experiments/${experiment.slug}`,
      tags: ['experiment', experiment.status],
      body: `${experiment.title} ${experiment.description}`,
    });
  }

  return items;
}

export const searchIndex = buildSearchIndex();

/** Simple case-insensitive substring match — navigation-first, not fuzzy. */
export function querySearchIndex(query: string, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return searchIndex.filter((item) => item.type === 'page').slice(0, limit);
  }

  return searchIndex
    .map((item) => {
      const haystack = `${item.title} ${item.description} ${item.tags.join(' ')} ${item.body}`.toLowerCase();
      const score =
        (item.title.toLowerCase().includes(q) ? 3 : 0) +
        (item.description.toLowerCase().includes(q) ? 2 : 0) +
        (haystack.includes(q) ? 1 : 0);
      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}
