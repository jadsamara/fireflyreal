const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Ensure source maps are enabled for both dev and prod builds
config.transformer = {
  ...config.transformer,
  sourceMaps: true,
};

module.exports = config;
