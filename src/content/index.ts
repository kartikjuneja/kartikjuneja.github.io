import type {
  Article,
  Availability,
  Education,
  Experience,
  Experiment,
  Language,
  MarkdownPage,
  Navigation,
  Product,
  Service,
  Site,
  SkillGroup,
  SocialLink,
  TimelineItem,
} from '@/types';
import {
  asNullableString,
  asString,
  asStringArray,
  parseFrontmatter,
} from '@/content/parseFrontmatter';
import { renderMarkdown, splitMarkdownSections } from '@/content/markdown';

import siteJson from '@content/site.json';
import navigationJson from '@content/navigation.json';
import socialJson from '@content/social.json';
import servicesJson from '@content/services.json';
import timelineJson from '@content/timeline.json';
import experienceJson from '@content/experience.json';
import educationJson from '@content/education.json';
import skillsJson from '@content/skills.json';
import availabilityJson from '@content/availability.json';

const pageModules = import.meta.glob('../../content/pages/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const productModules = import.meta.glob('../../content/products/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const writingModules = import.meta.glob('../../content/writing/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const experimentModules = import.meta.glob('../../content/experiments/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function fileSlug(path: string): string {
  const file = path.split('/').pop() ?? path;
  return file.replace(/\.md$/, '');
}

function isTemplateFile(path: string): boolean {
  return fileSlug(path).startsWith('_');
}

export const site = siteJson as Site;
export const navigation = navigationJson as Navigation;
export const social = socialJson as SocialLink[];
export const services = servicesJson as Service[];
export const timeline = timelineJson as TimelineItem[];
export const experience = experienceJson as Experience[];
export const education = educationJson as Education[];
export const availability = availabilityJson as Availability;

export const skillGroups = (skillsJson as { groups: SkillGroup[] }).groups;
export const spokenLanguages = (skillsJson as { languages: Language[] }).languages;

export const pages: MarkdownPage[] = Object.entries(pageModules)
  .filter(([path]) => !isTemplateFile(path))
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = fileSlug(path);
    return {
      slug,
      title: asString(data.title, slug),
      description: asString(data.description),
      bodyHtml: renderMarkdown(content),
    };
  });

export function getPage(slug: string): MarkdownPage | undefined {
  return pages.find((page) => page.slug === slug);
}

export const products: Product[] = Object.entries(productModules)
  .filter(([path]) => !isTemplateFile(path))
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = asString(data.slug, fileSlug(path));
    const linksRaw = (data.links ?? {}) as Record<string, unknown>;
    return {
      slug,
      name: asString(data.name, slug),
      description: asString(data.description, '—'),
      status: asString(data.status, '—'),
      technology: asStringArray(data.technology),
      featured: Boolean(data.featured),
      links: {
        website: asNullableString(linksRaw.website),
        repository: asNullableString(linksRaw.repository),
        caseStudy: asNullableString(linksRaw.caseStudy),
      },
      bodyHtml: renderMarkdown(content),
      sections: splitMarkdownSections(content),
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export const articles: Article[] = Object.entries(writingModules)
  .filter(([path]) => !isTemplateFile(path))
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = asString(data.slug, fileSlug(path));
    return {
      slug,
      title: asString(data.title, slug),
      description: asString(data.description, '—'),
      date: asNullableString(data.date),
      status: asString(data.status, '—'),
      bodyHtml: renderMarkdown(content),
    };
  })
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''));

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export const experiments: Experiment[] = Object.entries(experimentModules)
  .filter(([path]) => !isTemplateFile(path))
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = asString(data.slug, fileSlug(path));
    return {
      slug,
      title: asString(data.title, slug),
      description: asString(data.description, '—'),
      status: asString(data.status, '—'),
      bodyHtml: renderMarkdown(content),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}
