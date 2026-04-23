import { getCollection, type CollectionEntry } from 'astro:content';

export type WritingEntry = CollectionEntry<'writings'>;

export function splitId(id: string): { category: string; entry: string } {
  const [category, ...rest] = id.split('/');
  return { category, entry: rest.join('/') };
}

export async function getWritings(): Promise<WritingEntry[]> {
  return getCollection('writings', ({ data }) => !data.draft);
}

export async function getCategoryIndexes(): Promise<WritingEntry[]> {
  const all = await getWritings();
  return all
    .filter(e => e.data.isIndex || e.id.endsWith('/_index'))
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

export async function getCategoryEntries(category: string): Promise<WritingEntry[]> {
  const all = await getWritings();
  return all
    .filter(e => {
      const { category: c } = splitId(e.id);
      return c === category && !e.data.isIndex && !e.id.endsWith('/_index');
    })
    .sort((a, b) => {
      const da = a.data.date?.valueOf() ?? 0;
      const db = b.data.date?.valueOf() ?? 0;
      return db - da;
    });
}

export async function getCategoryIndex(category: string): Promise<WritingEntry | undefined> {
  const all = await getWritings();
  return all.find(e => {
    const { category: c } = splitId(e.id);
    return c === category && (e.data.isIndex || e.id.endsWith('/_index'));
  });
}
