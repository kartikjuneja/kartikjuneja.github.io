export function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Record<string, string | boolean | undefined> = {},
  children: Array<Node | string | null | undefined> = [],
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);

  for (const [key, value] of Object.entries(props)) {
    if (value === undefined || value === false) continue;
    if (key === 'className') {
      node.setAttribute('class', String(value));
      continue;
    }
    if (value === true) {
      node.setAttribute(key, '');
      continue;
    }
    node.setAttribute(key, value);
  }

  for (const child of children) {
    if (child === null || child === undefined || child === '') continue;
    node.append(child instanceof Node ? child : document.createTextNode(child));
  }

  return node;
}

export function html(target: HTMLElement, markup: string): HTMLElement {
  target.innerHTML = markup;
  return target;
}
