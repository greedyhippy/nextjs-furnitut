/** @type {import('next').NextConfig} */
const nextConfig = {
    serverComponentsExternalPackages: ['@react-pdf/renderer'],
    experimental: {
        ppr: 'incremental',
    },
};

export default nextConfig;
