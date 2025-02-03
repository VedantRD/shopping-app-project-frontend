import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: `@use './styles/variables.scss' as *;`,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;