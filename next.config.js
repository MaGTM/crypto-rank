/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable unicorn/prefer-module */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/* eslint-disable unicorn/prefer-module */
module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.api.cryptorank.io",
        pathname: "/coins/**",
      },
    ],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "page.ts", "page.js", "page.jsx"],
});
