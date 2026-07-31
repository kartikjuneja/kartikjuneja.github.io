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

export interface ResumeConfig {
  sections: Array<'experience' | 'education' | 'skills'>;
}

export interface HomepageConfig {
  intro: string;
  nowBuilding: {
    slug: string | null;
    ctaLabel: string;
  };
  selected: {
    mode: string;
    slugs: string[];
    limit: number;
  };
  knowledgePreview: {
    limit: number;
  };
}

export type ProductType = 'independent' | 'professional' | 'research';

export interface ProductLinks {
  website: string | null;
  repository: string | null;
  demo: string | null;
}

export interface Product {
  slug: string;
  title: string;
  /** @deprecated use title */
  name: string;
  summary: string;
  /** @deprecated use summary */
  description: string;
  type: ProductType;
  status: string;
  employer: string | null;
  client: string | null;
  /** Role on professional work; omit for independent products. */
  role: string | null;
  technology: string[];
  links: ProductLinks;
  featured: boolean;
  homeOrder: number;
  bodyHtml: string;
  sections: Record<string, string>;
}

export type KnowledgeKind =
  | 'article'
  | 'note'
  | 'architecture'
  | 'decision'
  | 'lesson'
  | 'review';

export interface KnowledgeItem {
  slug: string;
  title: string;
  summary: string;
  date: string | null;
  status: string;
  kind: KnowledgeKind;
  tags: string[];
  topics: string[];
  featured: boolean;
  order: number;
  bodyHtml: string;
  sections: Record<string, string>;
}

/** @deprecated use KnowledgeItem */
export type Article = KnowledgeItem;

export interface MarkdownDoc {
  slug: string;
  title: string;
  description: string;
  bodyHtml: string;
}

export type SearchItemType = 'page' | 'product' | 'knowledge' | 'article';

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  type: SearchItemType;
  url: string;
  tags: string[];
  body: string;
}
