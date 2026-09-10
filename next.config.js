import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias['react-router-dom'] = path.resolve(__dirname, 'src/lib/router-compat.js');
    config.resolve.alias['react-router'] = path.resolve(__dirname, 'src/lib/router-compat.js');
    config.resolve.alias['@remix-run/router'] = path.resolve(__dirname, 'src/lib/router-compat.js');
    return config;
  },
};

export default nextConfig;
