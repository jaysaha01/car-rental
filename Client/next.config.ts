import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.icon-icons.com',
      },
      {
        protocol: 'https',
        hostname: 'wallpapers.com',
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: "https://my-car-rental-backend.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
