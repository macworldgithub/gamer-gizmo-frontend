const nextConfig = {
  images: {
    domains: ["localhost"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete
    // even if your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },

  webpack(config: any) {
    // Find and modify the rule that handles SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule: any) =>
        rule.test && rule.test instanceof RegExp && rule.test.test(".svg")
    );

    // Exclude SVGs from the default file loader
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/;
    }

    // Add a new rule for handling SVGs as React components
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
