/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        ppr: 'incremental',
    },
};

export default nextConfig;
