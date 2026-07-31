import type { PageModule } from '@/router/types';
import { el, html } from '@/components/dom';
import { AppShell, ModuleList, ModuleRow, SparseState } from '@/components/module';
import {
  aboutFocus,
  aboutPhilosophy,
  aboutStory,
  aboutUses,
  education,
  experience,
  skillGroups,
  spokenLanguages,
} from '@/content';

function isSparseHtml(bodyHtml: string | undefined): boolean {
  if (!bodyHtml) return true;
  const text = bodyHtml.replace(/<[^>]+>/g, '').trim();
  return !text || /^not published\.?$/i.test(text);
}

function proseSection(
  id: string,
  title: string,
  bodyHtml: string | undefined,
): HTMLElement | null {
  if (isSparseHtml(bodyHtml)) return null;

  const body = el('div', { className: 'module__body' });
  const prose = el('div', { className: 'prose' });
  html(prose, bodyHtml!);
  body.append(prose);

  return el('section', { className: 'module', id }, [
    el('header', { className: 'module__rail' }, [
      el('h2', { className: 'module__title' }, [title]),
    ]),
    body,
  ]);
}

const page: PageModule = {
  title: 'About',
  description: 'How Kartik thinks about building software',
  render() {
    const experienceIntro = el('p', { className: 'module-row__description' }, [
      'Summary of the practice that shaped the work — not a full employment history.',
    ]);

    const experienceBody = experience.length
      ? ModuleList(
          experience.map((role) =>
            ModuleRow({
              title: `${role.role} · ${role.company}`,
              description: role.highlights.join(' '),
              meta: `${role.start} – ${role.end}`,
            }),
          ),
        )
      : SparseState('No professional experience published.');

    const educationRows = education
      .filter((item) => item.credential && item.credential !== 'Schooling')
      .map((item) =>
        ModuleRow({
          title: item.credential,
          description: item.institution,
          meta: [item.start, item.end].filter(Boolean).join(' – ') || undefined,
        }),
      );

    const resumeChildren: HTMLElement[] = [
      el('p', { className: 'module-row__description' }, [
        'Reference only. Products and philosophy above are the primary story.',
      ]),
    ];

    if (educationRows.length) {
      resumeChildren.push(ModuleList(educationRows));
    }

    if (skillGroups.length) {
      const skills = skillGroups.flatMap((group) => group.items).join(' · ');
      resumeChildren.push(
        el('p', { className: 'muted' }, [`Skills (reference): ${skills}`]),
      );
    }

    if (spokenLanguages.length) {
      resumeChildren.push(
        el('p', { className: 'muted' }, [
          `Languages: ${spokenLanguages.map((l) => l.name).join(', ')}`,
        ]),
      );
    }

    const story = proseSection('story', 'Story', aboutStory?.bodyHtml);
    const philosophy = proseSection(
      'philosophy',
      'Engineering Philosophy',
      aboutPhilosophy?.bodyHtml,
    );
    const focus = proseSection('focus', 'Current Focus', aboutFocus?.bodyHtml);
    const uses = proseSection('uses', 'Uses', aboutUses?.bodyHtml);

    const children: HTMLElement[] = [];
    if (story) children.push(story);
    if (philosophy) children.push(philosophy);

    children.push(
      el('section', { className: 'module', id: 'experience' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Professional Experience']),
        ]),
        el('div', { className: 'module__body' }, [experienceIntro, experienceBody]),
      ]),
      el('section', { className: 'module', id: 'resume' }, [
        el('header', { className: 'module__rail' }, [
          el('h2', { className: 'module__title' }, ['Resume']),
          el('div', { className: 'module__rail-end' }, [
            el('span', { className: 'module__meta tabular' }, ['Reference']),
          ]),
        ]),
        el('div', { className: 'module__body' }, resumeChildren),
      ]),
    );

    if (focus) children.push(focus);
    if (uses) children.push(uses);

    return AppShell({
      title: 'About',
      description: 'Context for the products — not a competing resume.',
      children,
    });
  },
};

export default page;
