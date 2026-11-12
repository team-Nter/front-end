import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin({
  unstable_turbopack: { mode: 'auto' },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.BACKEND_URL}/:path*`,
      },
      {
        source: '/docs/:path*',
        destination: `${process.env.BACKEND_URL}/docs/:path*`,
      },
    ];
  },
};

export default withVanillaExtract(nextConfig);
