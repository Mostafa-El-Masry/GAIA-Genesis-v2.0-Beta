/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {},

  // Add security headers including CSP
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              // Restrict default sources to same origin
              "default-src 'self'",
              // Allow styles from same origin, inline styles, and jsdelivr CDN
              "style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net",
              // Add other required directives here
              "img-src 'self' data: blob:",
              "font-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "connect-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
