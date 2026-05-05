import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog posts live as a flat list of .md files under src/content/blog/.
// Posts are grouped by free-form `tags` (e.g. "poetry", "diary", "reflections").
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    date: z.coerce.date().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    heroCredit: z.string().optional(),
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
    gallery: z.boolean().default(false),
    items: z.array(z.object({
      name: z.string(),
      link: z.string().optional(),
      image: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    })).optional(),
  }),
});

export const collections = { blog, rubricas };
