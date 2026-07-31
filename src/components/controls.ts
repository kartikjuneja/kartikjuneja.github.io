import { el } from '@/components/dom';

export function Button(options: {
  href?: string;
  label: string;
  variant?: 'primary' | 'ghost' | 'text';
  type?: 'button' | 'submit';
  onClick?: (event: Event) => void;
}): HTMLElement {
  const className = `btn btn--${options.variant ?? 'primary'}`;

  if (options.href) {
    return el('a', { className, href: options.href }, [options.label]);
  }

  const button = el(
    'button',
    { className, type: options.type ?? 'button' },
    [options.label],
  );
  if (options.onClick) button.addEventListener('click', options.onClick);
  return button;
}
