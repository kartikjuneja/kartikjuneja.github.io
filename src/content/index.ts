import type {
  Education,
  Experience,
  HomepageConfig,
  KnowledgeItem,
  KnowledgeKind,
  Language,
  MarkdownDoc,
  Navigation,
  Product,
  ProductType,
  ResumeConfig,
  Site,
  SkillGroup,
  SocialLink,
} from '@/types';
import {
  asNullableString,
  asString,
  asStringArray,
  parseFrontmatter,
} from '@/content/parseFrontmatter';
import { renderMarkdown, splitMarkdownSections } from '@/content/markdown';

import settingsJson from '@content/site/settings.json';
import navigationJson from '@content/site/navigation.json';
import socialJson from '@content/site/social.json';
import homepageJson from '@content/home/homepage.json';
import experienceJson from '@content/about/experience.json';
import educationJson from '@content/about/education.json';
import skillsJson from '@content/about/skills.json';
import resumeJson from '@content/about/resume.json';

const aboutModules = import.meta.glob('../../content/about/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const productModules = import.meta.glob('../../content/products/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const caseStudyModules = import.meta.glob('../../content/case-studies/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const knowledgeModules = import.meta.glob('../../content/knowledge/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

function fileSlug(path: string): string {
  const file = path.split(/[/\\]/).pop() ?? path;
  return file.replace(/\.md$/, '');
}

function isTemplateFile(path: string): boolean {
  return fileSlug(path).startsWith('_');
}

function knowledgeKindFromPath(path: string): KnowledgeKind {
  const normalized = path.replace(/\\/g, '/');
  if (normalized.includes('/notes/')) return 'note';
  if (normalized.includes('/architecture/')) return 'architecture';
  if (normalized.includes('/decisions/')) return 'decision';
  if (normalized.includes('/lessons/')) return 'lesson';
  if (normalized.includes('/reviews/')) return 'review';
  return 'article';
}

function parseProduct(
  path: string,
  raw: string,
  defaultType: ProductType,
): Product {
  const { data, content } = parseFrontmatter(raw);
  const slug = asString(data.slug, fileSlug(path));
  const linksRaw = (data.links ?? {}) as Record<string, unknown>;
  const title = asString(data.title, asString(data.name, slug));
  const summary = asString(data.summary, asString(data.description, '—'));
  const type = asString(data.type, defaultType) as ProductType;

  return {
    slug,
    title,
    name: title,
    summary,
    description: summary,
    type,
    status: asString(data.status, '—'),
    employer: asNullableString(data.employer),
    client: asNullableString(data.client),
    role: asNullableString(data.role),
    technology: asStringArray(data.technology),
    featured: Boolean(data.featured),
    homeOrder: typeof data.homeOrder === 'number' ? data.homeOrder : 0,
    links: {
      website: asNullableString(linksRaw.website),
      repository: asNullableString(linksRaw.repository),
      demo: asNullableString(linksRaw.demo ?? linksRaw.caseStudy),
    },
    bodyHtml: renderMarkdown(content),
    sections: splitMarkdownSections(content),
  };
}

export const site = settingsJson as Site;
export const navigation = navigationJson as Navigation;
export const social = socialJson as SocialLink[];
export const homepage = homepageJson as HomepageConfig;
export const experience = experienceJson as Experience[];
export const education = educationJson as Education[];
export const resume = resumeJson as ResumeConfig;

export const skillGroups = (skillsJson as { groups: SkillGroup[] }).groups;
export const spokenLanguages = (skillsJson as { languages: Language[] }).languages;

function loadAboutDoc(slug: string): MarkdownDoc | undefined {
  const entry = Object.entries(aboutModules).find(([path]) => fileSlug(path) === slug);
  if (!entry) return undefined;
  const [, raw] = entry;
  const { data, content } = parseFrontmatter(raw);
  return {
    slug,
    title: asString(data.title, slug),
    description: asString(data.description),
    bodyHtml: renderMarkdown(content),
  };
}

export const aboutStory = loadAboutDoc('story');
export const aboutPhilosophy = loadAboutDoc('philosophy');
export const aboutFocus = loadAboutDoc('focus');
export const aboutUses = loadAboutDoc('uses');

const independentProducts = Object.entries(productModules)
  .filter(([path]) => !isTemplateFile(path))
  .map(([path, raw]) => parseProduct(path, raw, 'independent'));

const caseStudies = Object.entries(caseStudyModules)
  .filter(([path]) => !isTemplateFile(path))
  .map(([path, raw]) => parseProduct(path, raw, 'professional'));

/** All product-shaped work (independent, professional, research). */
export const products: Product[] = [...independentProducts, ...caseStudies].sort(
  (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    a.homeOrder - b.homeOrder ||
    a.title.localeCompare(b.title),
);

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getIndependentProducts(): Product[] {
  return products.filter((product) => product.type === 'independent');
}

export function getCaseStudies(): Product[] {
  return products.filter((product) => product.type === 'professional');
}

export const knowledge: KnowledgeItem[] = Object.entries(knowledgeModules)
  .filter(([path]) => !isTemplateFile(path) && path.endsWith('.md'))
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const slug = asString(data.slug, fileSlug(path));
    const kind = (asString(data.kind, knowledgeKindFromPath(path)) ||
      'article') as KnowledgeKind;
    return {
      slug,
      title: asString(data.title, slug),
      summary: asString(data.summary, asString(data.description, '—')),
      date: asNullableString(data.date),
      status: asString(data.status, 'published'),
      kind,
      tags: asStringArray(data.tags),
      topics: asStringArray(data.topics),
      featured: Boolean(data.featured),
      order: typeof data.order === 'number' ? data.order : 0,
      bodyHtml: renderMarkdown(content),
      sections: splitMarkdownSections(content),
    };
  })
  .filter((item) => item.status !== 'draft')
  .sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      a.order - b.order ||
      (b.date ?? '').localeCompare(a.date ?? '') ||
      a.title.localeCompare(b.title),
  );

/** @deprecated use knowledge */
export const articles = knowledge;

export function getKnowledge(slug: string): KnowledgeItem | undefined {
  return knowledge.find((item) => item.slug === slug);
}

/** @deprecated use getKnowledge */
export function getArticle(slug: string): KnowledgeItem | undefined {
  return getKnowledge(slug);
}
