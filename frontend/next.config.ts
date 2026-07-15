import type { NextConfig } from "next";

const repo = "kindloom-";
const isGitHubPages = process.env.DEPLOY_TARGET === "github";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? `/${repo}` : "",
  assetPrefix: isGitHubPages ? `/${repo}/` : "",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;