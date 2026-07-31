import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import {
  HomeGrid,
  ModuleList,
  ModuleRow,
  ModuleShell,
  SparseState,
} from '@/components/module';
import { homepage, knowledge, products, site } from '@/content';
import type { Product, ProductType } from '@/types';

function typeMeta(product: Product): string {
  if (product.type === 'professional') {
    return product.employer ? `Case study · ${product.employer}` : 'Case study';
  }
  if (product.type === 'research') return 'Research';
  return 'Independent';
}

function typeRank(type: ProductType): number {
  if (type === 'independent') return 0;
  if (type === 'research') return 1;
  return 2;
}

/** Featured Work: independent first, professional last; never pad with fiction. */
function resolveFeaturedWork(): Product[] {
  const limit = homepage.selected?.limit ?? 4;
  const slugs = homepage.selected?.slugs ?? [];

  let list: Product[];
  if (slugs.length > 0) {
    list = slugs
      .map((slug) => products.find((p) => p.slug === slug))
      .filter((p): p is Product => Boolean(p));
  } else {
    const featured = products.filter((p) => p.featured);
    list = featured.length ? featured : [...products];
  }

  return [...list]
    .sort(
      (a, b) =>
        typeRank(a.type) - typeRank(b.type) ||
        a.homeOrder - b.homeOrder ||
        a.title.localeCompare(b.title),
    )
    .slice(0, limit);
}

const page: PageModule = {
  title: site.name,
  description: site.meta.description,
  render() {
    const introModule = ModuleShell({
      title: 'Intro',
      body: [
        el('p', { className: 'module-row__title' }, [
          homepage.intro || site.tagline,
        ]),
      ],
    });

    const buildingSlug = homepage.nowBuilding?.slug ?? null;
    const building = buildingSlug
      ? products.find((p) => p.slug === buildingSlug)
      : undefined;

    const nowBuilding = ModuleShell({
      title: 'Now Building',
      action: building
        ? {
            label: homepage.nowBuilding.ctaLabel || 'Open',
            href: `/products/${building.slug}`,
          }
        : { label: 'Products', href: '/products' },
      body: building
        ? [
            el('p', { className: 'module-row__title' }, [building.title]),
            el('p', { className: 'module-row__description' }, [
              building.summary,
            ]),
            el('p', { className: 'module-row__description muted' }, [
              `${typeMeta(building)} · ${building.status}`,
            ]),
          ]
        : [
            SparseState(
              'Preparing the next public product.',
              'Open Products for what is already documented.',
            ),
          ],
    });

    const featuredList = resolveFeaturedWork();

    const featuredWork = ModuleShell({
      title: 'Featured Work',
      action: { label: 'All products', href: '/products' },
      body: featuredList.length
        ? ModuleList(
            featuredList.map((product) =>
              ModuleRow({
                title: product.title,
                description: product.summary || undefined,
                meta: typeMeta(product),
                href: `/products/${product.slug}`,
              }),
            ),
          )
        : SparseState(
            'No public work listed yet.',
            'Products and case studies will appear here as they are published.',
          ),
    });

    const knowledgeLimit = homepage.knowledgePreview?.limit ?? 3;
    const knowledgeItems = knowledge.slice(0, knowledgeLimit);

    const knowledgeModule = ModuleShell({
      title: 'Knowledge',
      action: { label: 'Browse', href: '/knowledge' },
      body: knowledgeItems.length
        ? ModuleList(
            knowledgeItems.map((item) =>
              ModuleRow({
                title: item.title,
                description: item.summary || undefined,
                meta: item.kind,
                href: `/knowledge/${item.slug}`,
              }),
            ),
          )
        : SparseState(
            'Notes on architecture and lessons learned.',
            'Browse Knowledge when entries are published.',
          ),
    });

    const aboutModule = ModuleShell({
      title: 'About',
      action: { label: 'Open', href: '/about' },
      body: [
        el('p', { className: 'module-row__description' }, [
          'Background, focus, and resume — supporting context.',
        ]),
      ],
    });

    return HomeGrid([
      { span: 12, priority: 'P0', node: introModule },
      { span: 12, priority: 'P0', node: nowBuilding },
      { span: 12, priority: 'P0', node: featuredWork },
      { span: 8, priority: 'P1', node: knowledgeModule },
      { span: 4, priority: 'P2', node: aboutModule },
    ]);
  },
};

export default page;
