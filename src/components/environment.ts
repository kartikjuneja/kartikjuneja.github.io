import { el } from '@/components/dom';

export type ChromeMode =
  | { kind: 'home' }
  | { kind: 'app'; title: string };

export type EnvironmentChromeApi = {
  element: HTMLElement;
  setMode: (mode: ChromeMode) => void;
  setLauncherHandler: (handler: () => void) => void;
  setThemeHandler: (handler: () => void) => void;
};

function shortcutLabel(): string {
  const isApple = /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
  return isApple ? '⌘K' : 'Ctrl K';
}

export function createEnvironmentChrome(options: {
  name: string;
  role: string;
}): EnvironmentChromeApi {
  let launcherHandler: (() => void) | null = null;
  let themeHandler: (() => void) | null = null;

  const account = el('a', { className: 'env-account', href: '/' }, [
    el('span', { className: 'env-account__name' }, [options.name]),
    el('span', { className: 'env-account__meta' }, [options.role]),
  ]);

  const back = el('a', {
    className: 'env-back',
    href: '/',
  }, ['← Home']) as HTMLAnchorElement;
  back.hidden = true;

  const appTitle = el('span', { className: 'env-app-title' }, ['']) as HTMLElement;
  appTitle.hidden = true;

  const context = el('div', { className: 'env-context' }, [back, appTitle]);

  const shortcut = shortcutLabel();
  const launcherBtn = el(
    'button',
    {
      className: 'icon-btn',
      type: 'button',
      'aria-label': `Command ${shortcut}`,
      'aria-keyshortcuts': 'Control+K Meta+K',
      title: `Command ${shortcut}`,
    },
    [
      el('span', {}, ['Command']),
      el('span', { className: 'icon-btn__kbd' }, [shortcut]),
    ],
  );

  const themeBtn = el(
    'button',
    {
      className: 'icon-btn',
      type: 'button',
      'aria-label': 'Toggle color theme',
      title: 'Toggle theme',
    },
    ['Theme'],
  );

  const actions = el('div', { className: 'env-actions' }, [launcherBtn, themeBtn]);
  const startSlot = el('div', { className: 'env-context' }, [account]);
  const inner = el('div', { className: 'env-chrome__inner' }, [startSlot, actions]);
  const element = el('header', { className: 'env-chrome' }, [inner]);

  launcherBtn.addEventListener('click', () => launcherHandler?.());
  themeBtn.addEventListener('click', () => themeHandler?.());

  function setMode(mode: ChromeMode): void {
    if (mode.kind === 'home') {
      startSlot.replaceChildren(account);
      back.hidden = true;
      appTitle.hidden = true;
      return;
    }

    appTitle.textContent = mode.title;
    back.hidden = false;
    appTitle.hidden = false;
    startSlot.replaceChildren(context);
  }

  return {
    element,
    setMode,
    setLauncherHandler(handler) {
      launcherHandler = handler;
    },
    setThemeHandler(handler) {
      themeHandler = handler;
    },
  };
}

export function createEnvironmentFooter(copy: string, hint: string): HTMLElement {
  return el('footer', { className: 'env-footer' }, [
    el('div', { className: 'env-footer__inner' }, [
      el('span', {}, [copy]),
      el('span', {}, [hint]),
    ]),
  ]);
}
