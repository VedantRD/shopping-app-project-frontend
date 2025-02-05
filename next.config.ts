import type { NextConfig } from "next";

const env = process.env.NODE_ENV;

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
  env: {
    API_URL: env === "development"
      ? "http://localhost:5000"
      : env === "production"
        ? "https://shopping-app-backend-zhur.onrender.com"
        : "https://shopping-app-backend-zhur.onrender.com",
  },
};

export default nextConfig;