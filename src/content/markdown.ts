import { marked } from 'marked';

marked.setOptions({
  gfm: true,
  breaks: false,
});

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false }) as string;
}

/** Split markdown body into ## heading sections for product case studies. */
export function splitMarkdownSections(source: string): Record<string, string> {
  const sections: Record<string, string> = {};
  const parts = source.split(/^##\s+/m).filter(Boolean);

  for (const part of parts) {
    const newline = part.indexOf('\n');
    const title = (newline === -1 ? part : part.slice(0, newline)).trim().toLowerCase();
    const body = newline === -1 ? '' : part.slice(newline + 1).trim();
    const key = title.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (key) sections[key] = body;
  }

  return sections;
}
