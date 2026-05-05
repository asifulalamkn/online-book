/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Used for Google Account profile pictures
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org", // Used for the direct Wikipedia image link
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com", // Used for your fallback avatars
      },
      {
        protocol: "https",
        hostname: "www.google.com", // Used for your fallback avatars
      },
    ],
  },
};

export default nextConfig;