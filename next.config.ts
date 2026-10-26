import type { NextConfig } from "next";

// GITHUB_PAGES=true additionally serves the site from the /p32-ltd-website
// project subpath for the client-preview GitHub Pages deployment.
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Static export into `out/` — served by nginx in the Docker image and by
  // Firebase Hosting.
  output: "export",
  // The default next/image loader needs a server; a static export has none.
  images: { unoptimized: true },
  ...(isGithubPages
    ? {
        basePath: "/p32-ltd-website",
        assetPrefix: "/p32-ltd-website/",
      }
    : {}),
};

export default nextConfig;
