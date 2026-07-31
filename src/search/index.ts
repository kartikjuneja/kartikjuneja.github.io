import type { KnowledgeItem, SearchItem } from '@/types';
import { knowledge, navigation, products } from '@/content';

/**
 * Build-time searchable corpus for the command palette and Knowledge search.
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
      title: product.title,
      description: product.summary,
      type: 'product',
      url: `/products/${product.slug}`,
      tags: [
        'product',
        product.type,
        product.status,
        ...(product.employer ? [product.employer] : []),
        ...product.technology,
      ],
      body: `${product.title} ${product.summary} ${product.technology.join(' ')} ${Object.values(product.sections).join(' ')}`,
    });
  }

  for (const item of knowledge) {
    items.push({
      id: `knowledge:${item.slug}`,
      title: item.title,
      description: item.summary,
      type: 'knowledge',
      url: `/knowledge/${item.slug}`,
      tags: [
        'knowledge',
        item.kind,
        item.status,
        ...item.tags,
        ...item.topics,
        ...(item.featured ? ['featured'] : []),
      ],
      body: `${item.title} ${item.summary} ${Object.values(item.sections).join(' ')}`,
    });
  }

  return items;
}

export const searchIndex = buildSearchIndex();

function scoreKnowledge(item: KnowledgeItem, q: string): number {
  const title = item.title.toLowerCase();
  const summary = item.summary.toLowerCase();
  const tags = item.tags.join(' ').toLowerCase();
  const topics = item.topics.join(' ').toLowerCase();
  const body = Object.values(item.sections).join(' ').toLowerCase();
  const kind = item.kind.toLowerCase();

  let score = 0;
  if (title.includes(q)) score += 5;
  if (summary.includes(q)) score += 4;
  if (tags.includes(q)) score += 3;
  if (topics.includes(q)) score += 3;
  if (kind.includes(q)) score += 2;
  if (body.includes(q)) score += 1;
  if (item.featured) score += 0.5;
  return score;
}

/** Knowledge discovery: title → summary → tags/topics → body. */
export function queryKnowledge(query: string, limit = 50): KnowledgeItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return knowledge.slice(0, limit);

  return knowledge
    .map((item) => ({ item, score: scoreKnowledge(item, q) }))
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        Number(b.item.featured) - Number(a.item.featured) ||
        a.item.order - b.item.order,
    )
    .slice(0, limit)
    .map((entry) => entry.item);
}

/** Simple case-insensitive substring match — navigation-first, not fuzzy. */
export function querySearchIndex(query: string, limit = 12): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) {
    return searchIndex.filter((item) => item.type === 'page').slice(0, limit);
  }

  return searchIndex
    .map((item) => {
      const title = item.title.toLowerCase();
      const description = item.description.toLowerCase();
      const tags = item.tags.join(' ').toLowerCase();
      const body = item.body.toLowerCase();

      let score = 0;
      if (title.includes(q)) score += 5;
      if (description.includes(q)) score += 4;
      if (tags.includes(q)) score += 3;
      if (body.includes(q)) score += 1;
      if (item.type === 'knowledge') score += 0.25;

      return { item, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
}
