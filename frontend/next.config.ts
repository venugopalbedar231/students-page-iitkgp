import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Dev-only. Next.js 403s cross-origin requests for /_next/* dev assets, so reaching the dev
  // server through a tunnel serves the HTML but none of the JS: nothing hydrates and every
  // accordion toggle goes dead. `cloudflared tunnel --url` mints a new random hostname on each
  // run, so match the whole domain rather than pinning one. Has no effect on next build/start.
  allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;
