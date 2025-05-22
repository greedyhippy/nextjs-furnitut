/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: ['@react-pdf/renderer'],
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        ppr: 'incremental',
        esmExternals: 'loose',
    },
};

export default nextConfig;
