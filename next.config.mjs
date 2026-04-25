/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
    experimental: {
    allowedDevOrigins: ['192.168.10.56:3000'],
  },
};

export default nextConfig;
