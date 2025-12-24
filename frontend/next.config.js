/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",

  runtimeCaching: [
    {
      // Cache all backend GET APIs (products, cart, user profile)
      urlPattern: /^http:\/\/localhost:5000\/api\/.*/i,
      handler: "NetworkFirst",
      options: {
        cacheName: "backend-api-cache",
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 // 1 hour
        },
        networkTimeoutSeconds: 10
      }
    }
  ]
});

const nextConfig = {
  reactStrictMode: true
};

module.exports = withPWA(nextConfig);
