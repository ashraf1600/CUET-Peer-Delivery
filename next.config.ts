/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  experimental: {
    appDir:true,
  },
  images:{
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
    ],
    domains:[
'storage.googleapis.com',
'img.freepik.com',
    ]
  }
};

export default nextConfig;
