/** @type {import('next').NextConfig} */

// Turbopack sets the `TURBOPACK` env var when `next dev --turbo` is used.
// Detect it so we can avoid applying webpack-only plugins that trigger warnings.
const isTurbopack = !!process.env.TURBOPACK;

const nextConfig = {
  experimental: {
    // https://ja.next-community-docs.dev/docs/app/api-reference/config/next-config-js/optimizePackageImports
    optimizePackageImports: [
      "@neondatabase/serverless",
      "drizzle-orm",
      "drizzle-seed",
      "next",
      "nodemailer",
      "react-dom",
    ],
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  // The bundle analyzer relies on webpack internals and isn't compatible with Turbopack.
  // Enable it only when **not** running with Turbopack and the ANALYZE flag is set.
  enabled: !isTurbopack && process.env.ANALYZE === "true",
});

// Export plain config for Turbopack, otherwise wrap with the analyzer plugin.
module.exports = isTurbopack ? nextConfig : withBundleAnalyzer(nextConfig);
