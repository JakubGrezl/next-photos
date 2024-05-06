/** @type {import('next').NextConfig} */
const path = require('path')
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "250mb",
    },
  },
  sassOptions: {
    includePaths: [path.join(__dirname, '/styles')],
  },
  images: {
    domains: ["localhost",process.env.CLOUDFLARE_R2_PUBLIC_IMAGE_URL ],
  },
};

module.exports = nextConfig;
