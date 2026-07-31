import type { PageModule } from '@/router/types';
import { Button } from '@/components/controls';
import { AppShell, SparseState } from '@/components/module';

const page: PageModule = {
  title: 'Not found',
  description: 'Page not found',
  render() {
    return AppShell({
      title: 'Not found',
      description: 'This path is not published.',
      children: [
        SparseState('Nothing here.', 'Return home or use Command to jump.'),
        Button({ href: '/', label: 'Back home', variant: 'primary' }),
      ],
    });
  },
};

export default page;
