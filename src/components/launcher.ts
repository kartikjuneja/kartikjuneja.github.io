import type { SearchItem } from '@/types';
import { el } from '@/components/dom';
import { querySearchIndex } from '@/search';

export function createSystemLauncher(options: {
  onNavigate: (url: string) => void;
}): {
  element: HTMLElement;
  open: () => void;
  close: () => void;
  toggle: () => void;
  isOpen: () => boolean;
} {
  let activeIndex = 0;
  let results: SearchItem[] = [];
  let lastFocus: HTMLElement | null = null;

  const input = el('input', {
    className: 'launcher__input',
    type: 'search',
    placeholder: 'Jump to module, app, or page…',
    'aria-label': 'Command launcher',
    autocomplete: 'off',
  }) as HTMLInputElement;

  const list = el('ul', {
    className: 'launcher__list',
    role: 'listbox',
    id: 'launcher-results',
    'aria-label': 'Results',
  });

  const hint = el('div', { className: 'launcher__hint' }, [
    'Navigate the Product Operating System. Esc to close.',
  ]);

  const dialog = el(
    'div',
    {
      className: 'launcher',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-label': 'Command launcher',
    },
    [input, list, hint],
  );

  const backdrop = el('div', { className: 'launcher-backdrop' }, [dialog]);

  function isOpen(): boolean {
    return backdrop.classList.contains('is-open');
  }

  function renderResults(query: string): void {
    results = querySearchIndex(query);
    activeIndex = 0;
    list.replaceChildren();

    if (!results.length) {
      list.append(el('li', { className: 'launcher__empty' }, ['No matches.']));
      return;
    }

    results.forEach((item, index) => {
      const button = el('button', { type: 'button', id: `launcher-option-${index}` }, [
        el('span', { className: 'launcher__item-title' }, [item.title]),
        el('span', { className: 'launcher__item-meta' }, [`${item.type} · ${item.url}`]),
      ]);
      button.addEventListener('click', () => {
        options.onNavigate(item.url);
        close();
      });
      list.append(
        el(
          'li',
          {
            className: index === activeIndex ? 'launcher__item is-active' : 'launcher__item',
            role: 'option',
            'aria-selected': index === activeIndex ? 'true' : 'false',
          },
          [button],
        ),
      );
    });

    input.setAttribute('aria-activedescendant', `launcher-option-${activeIndex}`);
  }

  function syncActive(): void {
    [...list.children].forEach((child, index) => {
      child.classList.toggle('is-active', index === activeIndex);
      child.setAttribute('aria-selected', index === activeIndex ? 'true' : 'false');
    });
    if (results.length) {
      input.setAttribute('aria-activedescendant', `launcher-option-${activeIndex}`);
    } else {
      input.removeAttribute('aria-activedescendant');
    }
  }

  function trapFocus(event: KeyboardEvent): void {
    if (!isOpen() || event.key !== 'Tab') return;
    const focusables = [input, ...[...list.querySelectorAll('button')]];
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function open(): void {
    lastFocus = document.activeElement as HTMLElement | null;
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    input.value = '';
    renderResults('');
    requestAnimationFrame(() => input.focus());
  }

  function close(): void {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    input.removeAttribute('aria-activedescendant');
    lastFocus?.focus?.();
  }

  function toggle(): void {
    if (isOpen()) close();
    else open();
  }

  input.addEventListener('input', () => renderResults(input.value));
  input.setAttribute('aria-controls', 'launcher-results');
  input.setAttribute('aria-autocomplete', 'list');

  input.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, Math.max(results.length - 1, 0));
      syncActive();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      syncActive();
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const item = results[activeIndex];
      if (item) {
        options.onNavigate(item.url);
        close();
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      close();
    }
  });

  backdrop.addEventListener('keydown', trapFocus);
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) close();
  });

  return { element: backdrop, open, close, toggle, isOpen };
}
