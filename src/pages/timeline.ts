import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { timeline } from '@/content';

const page: PageModule = {
  title: 'Timeline',
  description: 'Career and education timeline',
  render() {
    const body = timeline.length
      ? ModuleList(
          timeline.map((item) =>
            ModuleRow({
              title: item.title,
              description: [item.subtitle, item.description].filter(Boolean).join(' — ') || undefined,
              meta: item.date,
            }),
          ),
        )
      : SparseState('No timeline entries yet.');

    return AppShell({
      title: 'Timeline',
      description: 'Verified milestones from education and professional work.',
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Continuum']),
        ]),
        el('div', { className: 'module__body' }, [body]),
      ]),
    });
  },
};

export default page;
