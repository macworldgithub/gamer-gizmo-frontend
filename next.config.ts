// next.config.js
const nextConfig = {
  webpack(config: any) {
    // Find and modify the rule that handles SVGs
    const fileLoaderRule = config.module.rules.find(
      (rule: any) => rule.test && rule.test.test(".svg")
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
