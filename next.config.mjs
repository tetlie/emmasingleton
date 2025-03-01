/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'],
    minimumCacheTTL: 3600, // Cache images for at least 1 hour
  },
}

export default nextConfig
