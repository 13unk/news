import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  basePath: '/news',
  // output: 'export' remains removed for Vercel deployment
};

export default nextConfig;
