import '@/styles/base.css';
import { startApp } from '@/app';

const root = document.querySelector<HTMLElement>('#app');
if (!root) {
  throw new Error('Root element #app not found');
}

startApp(root);
