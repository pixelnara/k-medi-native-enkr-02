/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static HTML export → produces an `out/` folder that can be dropped onto
  // vercel.com/drop (or served by any static host). The whole site is static.
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
