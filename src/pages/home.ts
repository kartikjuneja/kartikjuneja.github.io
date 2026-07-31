import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import {
  HomeGrid,
  ModuleList,
  ModuleRow,
  ModuleShell,
  SparseState,
} from '@/components/module';
import {
  articles,
  availability,
  experience,
  products,
  site,
  timeline,
} from '@/content';

const page: PageModule = {
  title: site.name,
  description: site.meta.description,
  render() {
    const focusReady = Boolean(site.currentFocus && site.currentFocus !== 'Coming Soon');
    const focusBody = focusReady
      ? ([
          el('p', { className: 'module-row__title' }, [site.currentFocus]),
          site.summary && site.summary !== 'Coming Soon'
            ? el('p', { className: 'module-row__description' }, [site.summary])
            : null,
        ].filter(Boolean) as HTMLElement[])
      : [
          SparseState(
            `${site.title}`,
            'Current focus will appear here when published.',
          ),
        ];

    const focusModule = ModuleShell({
      title: 'Current Focus',
      action: { label: 'Open', href: '/now' },
      body: focusBody,
    });

    const availabilityModule = ModuleShell({
      title: 'Availability',
      action: { label: 'Open', href: '/now' },
      body: [
        el('p', { className: 'module-row__title' }, [
          availability.status && availability.status !== 'Coming Soon'
            ? availability.status
            : '—',
        ]),
        el('p', { className: 'module-row__description' }, [
          availability.note && availability.note !== 'Coming Soon'
            ? availability.note
            : '—',
        ]),
      ],
    });

    const productsModule = ModuleShell({
      title: 'Products',
      meta: products.length ? String(products.length) : undefined,
      action: { label: 'Open', href: '/products' },
      body: products.length
        ? ModuleList(
            products.slice(0, 5).map((product) =>
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
            'Case studies will appear here when published.',
          ),
    });

    const timelineModule = ModuleShell({
      title: 'Timeline',
      action: { label: 'Open', href: '/timeline' },
      body: timeline.length
        ? ModuleList(
            timeline.slice(0, 4).map((item) =>
              ModuleRow({
                title: item.title,
                description: item.subtitle || undefined,
                meta: item.date,
              }),
            ),
          )
        : SparseState('No timeline entries yet.'),
    });

    const latestRole = experience[0];
    const resumeModule = ModuleShell({
      title: 'Resume',
      action: { label: 'Open', href: '/resume' },
      body: latestRole
        ? [
            el('p', { className: 'module-row__title' }, [
              `${latestRole.role} · ${latestRole.company}`,
            ]),
            el('p', { className: 'module-row__description tabular' }, [
              `${latestRole.start} – ${latestRole.end}`,
            ]),
          ]
        : [SparseState('Resume —')],
    });

    const contactModule = ModuleShell({
      title: 'Contact',
      action: { label: 'Open', href: '/contact' },
      body: [
        el('p', { className: 'module-row__title' }, ['Project inquiry']),
        el('p', { className: 'module-row__description' }, [
          'Start a professional conversation.',
        ]),
      ],
    });

    const items: Array<{ span: 4 | 6 | 8 | 12; priority: string; node: HTMLElement }> = [
      { span: 8, priority: 'P0', node: focusModule },
      { span: 4, priority: 'P2', node: availabilityModule },
      { span: 12, priority: 'P0', node: productsModule },
      { span: 6, priority: 'P1', node: timelineModule },
      { span: 6, priority: 'P1', node: resumeModule },
    ];

    // Notes only when content exists (Remove Before Add / empty-home clarity).
    if (articles.length) {
      items.push({
        span: 4,
        priority: 'P2',
        node: ModuleShell({
          title: 'Notes',
          action: { label: 'Open', href: '/writing' },
          body: ModuleList(
            articles.slice(0, 3).map((article) =>
              ModuleRow({
                title: article.title,
                description: article.description || undefined,
                meta: article.date || article.status,
                href: `/writing/${article.slug}`,
              }),
            ),
          ),
        }),
      });
      items.push({ span: 8, priority: 'P2', node: contactModule });
    } else {
      items.push({ span: 12, priority: 'P2', node: contactModule });
    }

    return HomeGrid(items);
  },
};

export default page;
