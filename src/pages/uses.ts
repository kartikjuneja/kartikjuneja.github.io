import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell } from '@/components/module';
import { getPage } from '@/content';

const page: PageModule = {
  title: 'Uses',
  description: 'Tools, hardware, and software',
  render() {
    const uses = getPage('uses');
    const prose = el('div', { className: 'prose' });
    html(prose, uses?.bodyHtml ?? '<p>Not published.</p>');

    return AppShell({
      title: 'Uses',
      description: 'Hardware, software, and tools.',
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Inventory']),
        ]),
        el('div', { className: 'module__body' }, [prose]),
      ]),
    });
  },
};

export default page;
