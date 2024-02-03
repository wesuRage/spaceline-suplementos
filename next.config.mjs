/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/produtos",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
