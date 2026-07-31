export interface ParsedMarkdown {
  data: Record<string, unknown>;
  content: string;
}

/**
 * Minimal YAML-ish frontmatter parser for string/number/boolean/null/arrays/simple maps.
 * Enough for this site's content files — not a full YAML implementation.
 */
export function parseFrontmatter(raw: string): ParsedMarkdown {
  const normalized = raw.replace(/^\uFEFF/, '');
  if (!normalized.startsWith('---')) {
    return { data: {}, content: normalized.trim() };
  }

  const end = normalized.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, content: normalized.trim() };
  }

  const fence = normalized.slice(3, end).replace(/^\r?\n/, '');
  const content = normalized.slice(end + 4).replace(/^\r?\n/, '').trim();
  return { data: parseSimpleYaml(fence), content };
}

function parseSimpleYaml(source: string): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  const lines = source.split(/\r?\n/);
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      i += 1;
      continue;
    }

    const match = /^(?<key>[A-Za-z0-9_-]+):\s*(?<value>.*)$/.exec(line);
    if (!match?.groups) {
      i += 1;
      continue;
    }

    const key = match.groups.key;
    const value = match.groups.value.trim();

    if (value === '' || value === '|' || value === '>') {
      const nested: Record<string, unknown> = {};
      const list: unknown[] = [];
      i += 1;
      let usedList = false;
      let usedMap = false;

      while (i < lines.length) {
        const nestedLine = lines[i];
        if (!/^\s+/.test(nestedLine) || !nestedLine.trim()) break;
        const item = nestedLine.trim();
        if (item.startsWith('- ')) {
          usedList = true;
          list.push(coerce(item.slice(2).trim()));
        } else {
          const nestedMatch = /^(?<key>[A-Za-z0-9_-]+):\s*(?<value>.*)$/.exec(item);
          if (nestedMatch?.groups) {
            usedMap = true;
            nested[nestedMatch.groups.key] = coerce(nestedMatch.groups.value.trim());
          }
        }
        i += 1;
      }

      result[key] = usedList ? list : usedMap ? nested : '';
      continue;
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      const inner = value.slice(1, -1).trim();
      result[key] = inner
        ? inner.split(',').map((part) => coerce(part.trim()))
        : [];
      i += 1;
      continue;
    }

    result[key] = coerce(value);
    i += 1;
  }

  return result;
}

function coerce(value: string): unknown {
  if (value === 'null' || value === '~') return null;
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  return value;
}

export function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

export function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === 'string');
}

export function asNullableString(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value;
  return null;
}
