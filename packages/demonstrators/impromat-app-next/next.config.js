const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    appDir: true,
    // swcPlugins: [
    //   [
    //     '@graphql-codegen/client-preset-swc-plugin',
    //     { artifactDirectory: './src/graphql-client', gqlTagName: 'graphql' },
    //   ],
    // ],
  },
});
