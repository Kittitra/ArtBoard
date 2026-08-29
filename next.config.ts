import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  //   webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     canvas: false,
  //   }
  //   return config
  // },
   serverExternalPackages: [
    "fluent-ffmpeg",
    "@ffmpeg-installer/ffmpeg",
  ],
};


export default nextConfig;
