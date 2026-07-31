export interface Site {
  name: string;
  title: string;
  domain: string;
  tagline: string;
  summary: string;
  currentFocus: string;
  email: string;
  location: string;
  meta: {
    title: string;
    description: string;
    ogImage: string;
    twitterHandle: string;
  };
}

export interface NavItem {
  label: string;
  path: string;
  description?: string;
  showInNav?: boolean;
  showInFooter?: boolean;
}

export interface Navigation {
  primary: NavItem[];
  actions: NavItem[];
}

export interface SocialLink {
  label: string;
  url: string;
  handle?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  subtitle?: string;
  description?: string;
  type: 'education' | 'work' | 'project' | 'milestone' | 'other';
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  start: string;
  end: string;
  location?: string;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  credential: string;
  start: string;
  end: string;
  location?: string;
  notes?: string;
}

export interface SkillGroup {
  id: string;
  name: string;
  items: string[];
}

export interface Language {
  name: string;
}

export interface Availability {
  status: string;
  focus: string;
  learning: string;
  work: string;
  note: string;
}

export interface ProductLinks {
  website: string | null;
  repository: string | null;
  caseStudy: string | null;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  status: string;
  technology: string[];
  links: ProductLinks;
  featured?: boolean;
  bodyHtml: string;
  sections: Record<string, string>;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string | null;
  status: string;
  bodyHtml: string;
}

export interface Experiment {
  slug: string;
  title: string;
  description: string;
  status: string;
  bodyHtml: string;
}

export interface MarkdownPage {
  slug: string;
  title: string;
  description: string;
  bodyHtml: string;
}

export type SearchItemType =
  | 'page'
  | 'product'
  | 'article'
  | 'service'
  | 'experiment'
  | 'timeline'
  | 'note';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: SearchItemType;
  url: string;
  tags: string[];
  body: string;
}
