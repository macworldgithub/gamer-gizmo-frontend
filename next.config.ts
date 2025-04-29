const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "backend.gamergizmo.com",
      },
      {
        protocol: "https",
        hostname: "www.backend.gamergizmo.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "4001",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  webpack(config: any) {
    const fileLoaderRule = config.module.rules.find(
      (rule: any) =>
        rule.test && rule.test instanceof RegExp && rule.test.test(".svg")
    );

    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
