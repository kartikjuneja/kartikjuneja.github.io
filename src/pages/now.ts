import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell } from '@/components/module';
import { availability, getPage } from '@/content';

const page: PageModule = {
  title: 'Now',
  description: 'Current focus and availability',
  render() {
    const now = getPage('now');
    const prose = el('div', { className: 'prose' });
    html(prose, now?.bodyHtml ?? '<p>Not published.</p>');

    return AppShell({
      title: 'Now',
      description: 'Current work, learning, focus, and availability.',
      children: [
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Status']),
          ]),
          el('div', { className: 'module__body' }, [
            statusRow('Current work', availability.work),
            statusRow('Learning', availability.learning),
            statusRow('Focus', availability.focus),
            statusRow('Availability', availability.status),
            statusRow('Note', availability.note),
          ]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Notes']),
          ]),
          el('div', { className: 'module__body' }, [prose]),
        ]),
      ],
    });
  },
};

function statusRow(label: string, value: string): HTMLElement {
  const display = value && value !== 'Coming Soon' ? value : '—';
  return el('div', { className: 'module-row' }, [
    el('div', {}, [
      el('p', { className: 'module-sparse__hint' }, [label]),
      el('p', { className: 'module-row__title' }, [display]),
    ]),
  ]);
}

export default page;
