/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  output: 'export',
  basePath: '/BashaarJavaid.github.io',
  trailingSlash: true,
};

module.exports = nextConfig; 