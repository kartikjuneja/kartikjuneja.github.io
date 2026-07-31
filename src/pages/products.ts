import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { products } from '@/content';
import type { Product, ProductType } from '@/types';

function byImportance(a: Product, b: Product): number {
  return (
    Number(b.featured) - Number(a.featured) ||
    a.homeOrder - b.homeOrder ||
    a.title.localeCompare(b.title)
  );
}

function group(
  type: ProductType,
  title: string,
  description: string,
): HTMLElement | null {
  const items = products.filter((p) => p.type === type).sort(byImportance);
  if (!items.length) return null;

  return el('section', { className: 'module' }, [
    el('header', { className: 'module__rail' }, [
      el('h2', { className: 'module__title' }, [title]),
      el('div', { className: 'module__rail-end' }, [
        el('span', { className: 'module__meta tabular' }, [String(items.length)]),
      ]),
    ]),
    el('div', { className: 'module__body' }, [
      el('p', { className: 'module-row__description' }, [description]),
      ModuleList(
        items.map((product) =>
          ModuleRow({
            title: product.title,
            description: product.summary || undefined,
            meta: product.status,
            href: `/products/${product.slug}`,
          }),
        ),
      ),
    ]),
  ]);
}

const page: PageModule = {
  title: 'Products',
  description: 'Products and case studies',
  render() {
    if (!products.length) {
      return AppShell({
        title: 'Products',
        description: 'Software products and professional case studies.',
        children: SparseState(
          'No products published yet.',
          'Independent work and case studies will appear here as they are written.',
        ),
      });
    }

    const sections = [
      group(
        'independent',
        'Independent Products',
        'Products built and owned outside employer delivery.',
      ),
      group(
        'professional',
        'Professional Case Studies',
        'Selected work delivered for an employer or client. Not personal products.',
      ),
      group(
        'research',
        'Research',
        'Explorations that are not product claims.',
      ),
    ].filter((node): node is HTMLElement => Boolean(node));

    return AppShell({
      title: 'Products',
      description: 'What has been built — and what was learned along the way.',
      children: sections,
    });
  },
};

export default page;
