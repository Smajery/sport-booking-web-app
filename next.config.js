/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // output: "standalone",
};

module.exports = nextConfig;
