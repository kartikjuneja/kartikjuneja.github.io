import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import { services } from '@/content';

const page: PageModule = {
  title: 'Services',
  description: 'Capabilities and engagement areas',
  render() {
    const ready = services.filter((service) => service.description !== 'Coming Soon');
    const body = ready.length
      ? ModuleList(
          ready.map((service) =>
            ModuleRow({
              title: service.name,
              description: service.description,
            }),
          ),
        )
      : SparseState(
          'Capabilities —',
          'Detailed capability descriptions will appear here.',
        );

    return AppShell({
      title: 'Services',
      description: 'Areas of focus for product and engineering work.',
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Capabilities']),
        ]),
        el('div', { className: 'module__body' }, [body]),
      ]),
    });
  },
};

export default page;
