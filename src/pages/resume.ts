import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import {
  education,
  experience,
  site,
  skillGroups,
  social,
  spokenLanguages,
  timeline,
} from '@/content';

const page: PageModule = {
  title: 'Resume',
  description: 'Printable resume',
  render() {
    const projects = timeline.filter((item) => item.type === 'project');
    const professional = social.filter((link) =>
      ['LinkedIn', 'GitHub', 'Twitter'].includes(link.label),
    );

    return AppShell({
      title: 'Resume',
      description: `${site.name} · ${site.title}`,
      children: [
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Profile']),
          ]),
          el('div', { className: 'module__body' }, [
            el('p', { className: 'module-row__title' }, [site.name]),
            el('p', { className: 'module-row__description' }, [
              [site.location, site.email, `https://${site.domain}`].join(' · '),
            ]),
            professional.length
              ? el('p', { className: 'module-row__description' }, [
                  professional.map((link) => link.label).join(' · '),
                ])
              : null,
            el('p', { className: 'module-sparse__hint no-print' }, [
              'PDF download is not available yet.',
            ]),
          ]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Experience']),
          ]),
          el('div', { className: 'module__body' }, [
            ModuleList(
              experience.map((item) =>
                el('div', { className: 'module-row' }, [
                  el('div', {}, [
                    el('p', { className: 'module-row__title' }, [
                      `${item.role} — ${item.company}`,
                    ]),
                    el(
                      'ul',
                      { className: 'module-row__description' },
                      item.highlights.map((highlight) => el('li', {}, [highlight])),
                    ),
                  ]),
                  el('span', { className: 'module-row__meta' }, [
                    `${item.start} – ${item.end}`,
                  ]),
                ]),
              ),
            ),
          ]),
        ]),
        el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, ['Projects']),
          ]),
          el('div', { className: 'module__body' }, [
            projects.length
              ? ModuleList(
                  projects.map((item) =>
                    ModuleRow({
                      title: item.title,
                      description: item.description || '—',
                      meta: item.date,
                    }),
                  ),
                )
              : SparseState('—'),
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
            el('h2', { className: 'module__title' }, ['Skills']),
          ]),
          el('div', { className: 'module__body' }, [
            ...skillGroups.map((group) =>
              el('div', {}, [
                el('p', { className: 'module-row__title' }, [group.name]),
                el('p', { className: 'module-row__description' }, [group.items.join(' · ')]),
              ]),
            ),
            el('p', { className: 'module-row__title' }, ['Languages']),
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
