/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  experimental: {
    // Las fotos del formulario de publicar viajan por server actions.
    serverActions: { bodySizeLimit: "15mb" },
  },
}

export default nextConfig
