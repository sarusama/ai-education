import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: { unoptimized: true },
  compiler: {
    define: {
      name: '富春三小期末非纸质测评系统（模拟）',
    },
  },
  distDir: 'build',
  output: 'export',
};

export default nextConfig;
