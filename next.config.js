/** @type {import('next').NextConfig} */
const nextConfig = {
  swcPlugins: [["next-superjson-plugin", {}]],
  images: {
    domains: [
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
  },
};

module.exports = nextConfig;
