import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
    url: z.string().url().optional(),
    draft: z.boolean().default(false),
  }),
});

// Writings are organized by subfolder. Each subfolder = one category (e.g. poetries, diaries-pages).
// A file named `_index.md` inside a category folder describes the category itself.
// Any other .md file is an entry inside that category.
const writings = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writings' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
    isIndex: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Rubricas are organized by subfolder. Each subfolder = one rubrica.
// A file named `_index.md` inside a rubrica folder describes the rubrica itself.
// Any other .md file is an entry inside that rubrica.
const rubricas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/rubricas' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
    isIndex: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, writings, rubricas };
