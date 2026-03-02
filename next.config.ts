import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.stripe.com",
        pathname: "/**",
      },
      {
        protocol: 'http',
        hostname: "localhost",
        port: "3000",
        pathname: "/**"
      },
      {
        // Autorise les images uploadées servies depuis le domaine de production
        protocol: "https",
        hostname: "**",
        pathname: "/uploads/products/**",
      },
    ],
    // Augmente la durée de cache des images optimisées (10 jours)
    minimumCacheTTL: 864000,
  },
};

export default nextConfig;

