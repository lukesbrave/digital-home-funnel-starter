import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the dev overlay badge out of /preview screenshot captures.
  devIndicators: false,
};

export default nextConfig;
