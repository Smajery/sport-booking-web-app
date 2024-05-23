/** @type {import('next').NextConfig} */
const withNextIntl = require("next-intl/plugin")();

const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  output: "standalone",
};

module.exports = withNextIntl(nextConfig);
