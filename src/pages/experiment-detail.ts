import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell, SparseState } from '@/components/module';
import { getExperiment } from '@/content';

export function create(slug: string): PageModule {
  const experiment = getExperiment(slug);

  return {
    title: experiment?.title ?? 'Experiment not found',
    description: experiment?.description ?? '',
    render() {
      if (!experiment) {
        return AppShell({
          title: 'Experiment not found',
          children: SparseState('This experiment does not exist.'),
        });
      }

      const prose = el('div', { className: 'prose' });
      html(prose, experiment.bodyHtml);

      return AppShell({
        title: experiment.title,
        description: experiment.description || undefined,
        children: el('section', { className: 'module' }, [
          el('header', { className: 'module__rail' }, [
            el('h2', { className: 'module__title' }, [experiment.status || 'Experiment']),
          ]),
          el('div', { className: 'module__body' }, [prose]),
        ]),
      });
    },
  };
}
