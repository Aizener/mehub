import { stat } from 'fs/promises';
import { resolve } from 'path';

import { defineCollection, defineConfig } from '@content-collections/core';
import { compileMDX } from '@content-collections/mdx';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { z } from 'zod';

const posts = defineCollection({
  name: 'posts',
  directory: 'posts',
  include: '**/*.mdx',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
  }),
  transform: async (doc, ctx) => {
    const file = await stat(resolve(process.cwd(), 'posts', doc._meta.filePath));
    const mdx = await compileMDX(ctx, doc, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
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

export default defineConfig({
  collections: [posts],
});
