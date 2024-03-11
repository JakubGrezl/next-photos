/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "250mb",
    },
  },
  images: {
    domains: ["localhost",process.env.NEXT_PUBLIC_CLOUDFLARE_R2_PUBLIC_DOMAIN ],
  },
};

module.exports = nextConfig;
