/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🌟 Allow your local network IP to access fonts and dev assets
  experimental: {
    allowedDevOrigins: ['192.168.56.1']
  }
};

module.exports = nextConfig;