/** @type {import("next").NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    root: import.meta.dirname
  }
}

export default nextConfig
