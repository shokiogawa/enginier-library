/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  experimental: { esmExternals: true },
  images: {
    domains: ['images.microcms-assets.io'],
  },
}
