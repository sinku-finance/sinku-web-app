import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // allow accessing the dev server over the local network IP without the HMR cross-origin warning
  allowedDevOrigins: ["192.168.1.204"],
  // Render metadata inline in the HTML <head> for ALL user agents instead of streaming it
  // in a Suspense boundary. Next 16's streaming metadata is what produces the
  // "<MetadataWrapper> div hidden={true} vs null" hydration mismatch in dev. Matching every
  // UA here forces the non-streaming (blocking) metadata path, which has no such boundary.
  htmlLimitedBots: /.*/,
  images: {
    formats: ["image/webp"],
    // allow higher-quality optimized output (default is 75, which double-compresses our webp source)
    qualities: [75, 90, 100],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "em-content.zobj.net",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
