/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/da6il8qmv/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
