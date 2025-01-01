import { NextConfig } from 'next'; // Import NextConfig type
import { Configuration } from 'webpack'; // Import webpack's Configuration type

const nextConfig: NextConfig = {
  webpack(config: Configuration) {
    // Find and modify the rule that handles SVGs
    const fileLoaderRule = config.module?.rules.find(
      (rule) => rule.test && rule.test instanceof RegExp && rule.test.test('.svg')
    );

    // Exclude SVGs from the default file loader
    if (fileLoaderRule) {
      (fileLoaderRule as any).exclude = /\.svg$/; // Type cast to avoid issues
    }

    // Add a new rule for handling SVGs as React components
    config.module?.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

export default nextConfig;
