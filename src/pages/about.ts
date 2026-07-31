import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell } from '@/components/module';
import { education, experience, getPage, site, spokenLanguages } from '@/content';
import { ModuleList, ModuleRow } from '@/components/module';

const page: PageModule = {
  title: 'About',
  description: 'Background and profile',
  render() {
    const about = getPage('about');
    const prose = el('div', { className: 'prose' });
    html(prose, about?.bodyHtml ?? '<p>Not published.</p>');

    return AppShell({
      title: 'About',
      description: `${site.title} · ${site.location}`,
      children: [
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Profile']),
          ]),
          el('div', { className: 'module__body' }, [prose]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Experience']),
          ]),
          el('div', { className: 'module__body' }, [
            ModuleList(
              experience.map((item) =>
                ModuleRow({
                  title: `${item.role} / ${item.company}`,
                  description: item.highlights.join(' '),
                  meta: `${item.start} – ${item.end}`,
                }),
              ),
            ),
          ]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Education']),
          ]),
          el('div', { className: 'module__body' }, [
            ModuleList(
              education.map((item) =>
                ModuleRow({
                  title: item.credential,
                  description: [item.institution, item.location].filter(Boolean).join(' · '),
                  meta: [item.start, item.end].filter(Boolean).join(' – ') || '—',
                }),
              ),
            ),
          ]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Languages']),
          ]),
          el('div', { className: 'module__body' }, [
            el('p', { className: 'module-row__description' }, [
              spokenLanguages.map((language) => language.name).join(' · '),
            ]),
          ]),
        ]),
      ],
    });
  },
};

export default page;
