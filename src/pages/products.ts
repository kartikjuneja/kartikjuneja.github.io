import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { products } from '@/content';

const page: PageModule = {
  title: 'Products',
  description: 'Products and case studies',
  render() {
    const body = products.length
      ? ModuleList(
          products.map((product) =>
            ModuleRow({
              title: product.name,
              description: product.description || '—',
              meta: product.status || '—',
              href: `/products/${product.slug}`,
            }),
          ),
        )
      : SparseState(
          'No products yet',
          'Published product case studies will be listed here.',
        );

    return AppShell({
      title: 'Products',
      description: 'Software products and case studies.',
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Inventory']),
        ]),
        el('div', { className: 'module__body' }, [body]),
      ]),
    });
  },
};

export default page;
