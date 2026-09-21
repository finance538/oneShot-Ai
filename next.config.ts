import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "172.20.10.2",
    "192.168.0.3",
    "localhost",
  ],
};

export default nextConfig;
