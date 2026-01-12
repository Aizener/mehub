import { readFile, stat } from 'fs/promises';
import { resolve } from 'path';

import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'contents/posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const file = await stat(resolve(process.cwd(), 'contents/posts', doc._meta.filePath));
    const mdx = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypeSlug, { prefix: 'iamcola-' }],
        [
          rehypePrettyCode,
          {
            theme: {
              light: 'github-light',
              dark: 'github-dark',
            },
            defaultLang: 'ts',
            keepBackground: false,
          },
        ],
      ],
    });
    return {
      ...doc,
      mdx,
      date: file.birthtime,
    };
  },
});

const daily = defineCollection({
  name: 'daily',
  directory: 'contents/daily',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    weather: z.string(),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const filePath = resolve(process.cwd(), 'contents/daily', doc._meta.filePath);
    const file = await stat(filePath);
    const weekday = new Date(file.birthtime).getDay();
    const mdx = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [rehypeSlug, { prefix: 'heading-' }],
        [
          rehypePrettyCode,
          {
            theme: {
              light: 'github-light',
              dark: 'github-dark',
            },
            defaultLang: 'ts',
            keepBackground: false,
          },
        ],
      ],
    });
    return {
      ...doc,
      mdx,
      weekday,
      content: await readFile(filePath, 'utf-8'),
      date: file.birthtime,
    };
  },
});

export default defineConfig({
  collections: [posts, daily],
});
