import type { PageModule } from '@/router/types';
import { el } from '@/components/dom';
import { Button } from '@/components/controls';
import { AppShell } from '@/components/module';
import { site } from '@/content';

const page: PageModule = {
  title: 'Contact',
  description: 'Project inquiry',
  render() {
    const form = el('form', { className: 'contact-form' }, [
      el('div', { className: 'field' }, [
        el('label', { for: 'inquiry-name' }, ['Name']),
        el('input', {
          id: 'inquiry-name',
          name: 'name',
          type: 'text',
          required: true,
          autocomplete: 'name',
        }),
      ]),
      el('div', { className: 'field' }, [
        el('label', { for: 'inquiry-email' }, ['Email']),
        el('input', {
          id: 'inquiry-email',
          name: 'email',
          type: 'email',
          required: true,
          autocomplete: 'email',
        }),
      ]),
      el('div', { className: 'field' }, [
        el('label', { for: 'inquiry-type' }, ['Inquiry type']),
        el('select', { id: 'inquiry-type', name: 'type' }, [
          el('option', { value: 'Recruiting' }, ['Recruiting']),
          el('option', { value: 'Client project' }, ['Client project']),
          el('option', { value: 'Collaboration' }, ['Collaboration']),
          el('option', { value: 'Other' }, ['Other']),
        ]),
      ]),
      el('div', { className: 'field' }, [
        el('label', { for: 'inquiry-message' }, ['Project details']),
        el('textarea', {
          id: 'inquiry-message',
          name: 'message',
          required: true,
        }),
      ]),
      Button({ label: 'Compose email', variant: 'primary', type: 'submit' }),
    ]);

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form as HTMLFormElement);
      const name = String(data.get('name') || '').trim();
      const email = String(data.get('email') || '').trim();
      const type = String(data.get('type') || '').trim();
      const message = String(data.get('message') || '').trim();
      if (!name || !email || !message) return;

      const subject = encodeURIComponent(`[${type}] Project inquiry from ${name}`);
      const body = encodeURIComponent(
        [`Name: ${name}`, `Email: ${email}`, `Type: ${type}`, '', message].join('\n'),
      );
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    });

    return AppShell({
      title: 'Contact',
      description: `Opens your email client to ${site.email}.`,
      children: el('section', { className: 'module' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Inquiry']),
        ]),
        el('div', { className: 'module__body' }, [
          el('p', { className: 'module-row__description' }, [
            'Share context, goals, and timing.',
          ]),
          form,
        ]),
      ]),
    });
  },
};

export default page;
