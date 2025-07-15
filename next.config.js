/** @type {import('next').NextConfig} */
const nextConfig = {
  // Commented out for development - API routes don't work with static export
  // output: 'export',
  // trailingSlash: true,
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
}

module.exports = nextConfig
