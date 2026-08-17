/** @type {import("next").NextConfig} */
import path from "node:path"

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    // The browser app consumes the canonical activity catalog from the repo's
    // docs folder so mobile and web do not drift into separate content sets.
    root: path.resolve(import.meta.dirname, "..")
  }
}

export default nextConfig
