import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    features: z.array(z.string()),
    link: z.string(),
    featured: z.boolean(),
    image: z.string().optional(),
  }),
});

export const collections = {
  projects,
};
