const nextConfig = {
  typescript: {
    // Ignore TypeScript errors during the build process
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // Find and modify the rule that handles SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule) =>
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
