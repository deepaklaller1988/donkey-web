/** @type {import('next').NextConfig} */


const nextConfig = {
    reactStrictMode: false,
    // output: "export",

      images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
          ],
        },
  };
  
  export default nextConfig;
  