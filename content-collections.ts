import { readFile, stat } from 'fs/promises';
import { resolve } from 'path';

import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMarkdown } from '@content-collections/markdown';
import { compileMDX } from '@content-collections/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'contents/posts',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    content: z.string(),
    date: z.string(),
  }),
  transform: async (doc, ctx) => {
    const html = await compileMarkdown(ctx, doc, {
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
      html,
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
    date: z.string(),
  }),
  transform: async (doc, ctx) => {
    const filePath = resolve(process.cwd(), 'contents/daily', doc._meta.filePath);
    const weekday = new Date(doc.date).getDay();
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
    };
  },
});

const notices = defineCollection({
  name: 'notices',
  directory: 'contents/notices',
  include: '**/*.md',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    priority: z.enum(['low', 'medium', 'normal', 'high']).default('normal'),
    tags: z.array(z.string()).optional().default([]),
    content: z.string(),
  }),
  transform: async (doc, ctx) => {
    const html = await compileMarkdown(ctx, doc);
    return {
      ...doc,
      html,
    };
  },
});

export default defineConfig({
  collections: [posts, daily, notices],
});
