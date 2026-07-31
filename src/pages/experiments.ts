import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { experiments } from '@/content';

const page: PageModule = {
  title: 'Experiments',
  description: 'Side projects and experiments',
  render() {
    const body = experiments.length
      ? ModuleList(
          experiments.map((experiment) =>
            ModuleRow({
              title: experiment.title,
              description: experiment.description || undefined,
              meta: experiment.status,
              href: `/experiments/${experiment.slug}`,
            }),
          ),
        )
      : SparseState('No experiments yet.');

    return AppShell({
      title: 'Experiments',
      description: 'Side projects and experiments.',
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Lab']),
        ]),
        el('div', { className: 'module__body' }, [body]),
      ]),
    });
  },
};

export default page;
