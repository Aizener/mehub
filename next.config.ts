import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 100],
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
