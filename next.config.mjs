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
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" }, 
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value:"Content-Type" },
      ]
  };
  
  export default nextConfig;
  