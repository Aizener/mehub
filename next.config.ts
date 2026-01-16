import { withContentCollections } from '@content-collections/next';
import type { NextConfig } from 'next';

const pkg = require('./package.json');

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_APP_VERSION: pkg.version,
  },
  images: {
    qualities: [75, 90, 100],
  },
};

// withContentCollections must be the outermost plugin
export default withContentCollections(nextConfig);
