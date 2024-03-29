const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the workspace root
const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;
const srcRoot = path.resolve(projectRoot, 'src');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot];
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(srcRoot),
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

module.exports = config;
