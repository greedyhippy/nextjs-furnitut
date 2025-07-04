/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable tracing to avoid Windows permissions issues
    experimental: {
        instrumentationHook: false,
    },
    // Optimize for Windows development
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.watchOptions = {
                poll: 1000,
                aggregateTimeout: 300,
            };
        }
        return config;
    },
};

export default nextConfig;
