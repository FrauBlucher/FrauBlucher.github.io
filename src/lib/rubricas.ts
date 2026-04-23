import { getCollection, type CollectionEntry } from 'astro:content';

export type RubricaEntry = CollectionEntry<'rubricas'>;

/** Split an entry id like "questions-for-conversations/my-entry" into parts. */
export function splitId(id: string): { rubrica: string; entry: string } {
  const [rubrica, ...rest] = id.split('/');
  return { rubrica, entry: rest.join('/') };
}

/** All non-draft rubrica entries. */
export async function getRubricas(): Promise<RubricaEntry[]> {
  const all = await getCollection('rubricas', ({ data }) => !data.draft);
  return all;
}

/** One index entry per rubrica (the `_index.md` file in each folder). */
export async function getRubricaIndexes(): Promise<RubricaEntry[]> {
  const all = await getRubricas();
  return all
    .filter(e => e.data.isIndex || e.id.endsWith('/_index') || e.id === '_index')
    .sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/** Entries belonging to a given rubrica (excluding the index). */
export async function getRubricaEntries(rubrica: string): Promise<RubricaEntry[]> {
  const all = await getRubricas();
  return all
    .filter(e => {
      const { rubrica: r } = splitId(e.id);
      return r === rubrica && !e.data.isIndex && !e.id.endsWith('/_index');
    })
    .sort((a, b) => {
      const da = a.data.date?.valueOf() ?? 0;
      const db = b.data.date?.valueOf() ?? 0;
      return db - da;
    });
}

/** The index entry for a single rubrica. */
export async function getRubricaIndex(rubrica: string): Promise<RubricaEntry | undefined> {
  const all = await getRubricas();
  return all.find(e => {
    const { rubrica: r } = splitId(e.id);
    return r === rubrica && (e.data.isIndex || e.id.endsWith('/_index'));
  });
}

/** Formatted date for display. */
export function fmtDate(d?: Date): string {
  if (!d) return '';
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}
