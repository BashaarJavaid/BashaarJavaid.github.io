/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
  output: 'export',
  basePath: '',
  trailingSlash: true,
};

module.exports = nextConfig; 