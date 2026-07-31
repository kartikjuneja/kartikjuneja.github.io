import type { Route } from '@/router/types';

export const routes: Route[] = [
  {
    path: '/',
    load: async () => (await import('@/pages/home')).default,
  },
  {
    path: '/about',
    load: async () => (await import('@/pages/about')).default,
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
    path: '/services',
    load: async () => (await import('@/pages/services')).default,
  },
  {
    path: '/timeline',
    load: async () => (await import('@/pages/timeline')).default,
  },
  {
    path: '/writing',
    load: async () => (await import('@/pages/writing')).default,
  },
  {
    pattern: /^\/writing\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/article')).create(params.slug),
  },
  {
    path: '/experiments',
    load: async () => (await import('@/pages/experiments')).default,
  },
  {
    pattern: /^\/experiments\/(?<slug>[a-z0-9-]+)$/,
    load: async (params) => (await import('@/pages/experiment-detail')).create(params.slug),
  },
  {
    path: '/uses',
    load: async () => (await import('@/pages/uses')).default,
  },
  {
    path: '/now',
    load: async () => (await import('@/pages/now')).default,
  },
  {
    path: '/resume',
    load: async () => (await import('@/pages/resume')).default,
  },
  {
    path: '/contact',
    load: async () => (await import('@/pages/contact')).default,
  },
];
