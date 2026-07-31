import type { Route } from '@/router/types';

/**
 * Legacy path redirects (pathname → destination path+hash).
 * Kept so old bookmarks resolve into the frozen five-route IA.
 */
export const redirects: Record<string, string> = {
  '/writing': '/knowledge',
  '/resume': '/about#resume',
  '/timeline': '/about',
  '/uses': '/about#uses',
  '/now': '/about#focus',
  '/services': '/about',
  '/experiments': '/products',
  '/work': '/products',
};

export const routes: Route[] = [
  {
    path: '/',
    load: async () => (await import('@/pages/home')).default,
  },
  {
    path: '/products',
    load: async () => (await import('@/pages/products')).default,
  },
  {
    pattern: /^\/products\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/product-detail')).create(params.slug),
  },
  {
    path: '/knowledge',
    load: async () => (await import('@/pages/knowledge')).default,
  },
  {
    pattern: /^\/knowledge\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/knowledge-detail')).create(params.slug),
  },
  {
    path: '/about',
    load: async () => (await import('@/pages/about')).default,
  },
  {
    path: '/contact',
    load: async () => (await import('@/pages/contact')).default,
  },
  // Legacy detail patterns → same handlers after redirect rewrite in router
  {
    pattern: /^\/writing\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/knowledge-detail')).create(params.slug),
  },
  {
    pattern: /^\/work\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/product-detail')).create(params.slug),
  },
  {
    pattern: /^\/experiments\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/product-detail')).create(params.slug),
  },
];
