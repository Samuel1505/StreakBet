import type { NextConfig } from "next";
import webpack from "webpack";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore test dependencies and React Native dependencies that are causing build errors
    config.plugins = config.plugins || [];
    config.plugins.push(
      new webpack.IgnorePlugin({
        resourceRegExp: /^(tap|tape|why-is-node-running|@react-native-async-storage\/async-storage)$/,
      })
    );

    // Replace test files with empty module
    const emptyModulePath = path.resolve(__dirname, 'empty-module.js');
    
    // Replace test files in node_modules
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /.*[\\/]test[\\/].*\.(js|ts|mjs)$/,
        (resource: any) => {
          if (resource.context.includes('node_modules')) {
            resource.request = emptyModulePath;
          }
        }
      )
    );
    
    // Specifically handle thread-stream test files
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(
        /thread-stream[\\/]test[\\/].*\.(js|ts|mjs)$/,
        emptyModulePath
      )
    );

    return config;
  },
  // Exclude problematic packages from server components bundling (Next.js 16 format)
  serverExternalPackages: [
    'thread-stream',
    '@walletconnect/core',
    '@walletconnect/sign-client',
    '@walletconnect/ethereum-provider',
  ],
};

export default nextConfig;
