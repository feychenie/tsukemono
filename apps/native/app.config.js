const LIGHT_SPLASH = {
  image: './assets/cucumber-splash.png',
  resizeMode: 'contain',
  backgroundColor: '#d9f99d',
};

const DARK_SPLASH = {
  image: './assets/cucumber-splash.png',
  resizeMode: 'contain',
  backgroundColor: '#000000',
};

const SHARED_SPLASH = {
  splash: {
    ...LIGHT_SPLASH,
    dark: {
      ...DARK_SPLASH,
    },
  },
};

export default {
  expo: {
    name: 'native',
    slug: 'native',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'automatic',

    entryPoint: 'src/App.tsx',
    splash: {
      ...LIGHT_SPLASH,
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
      ...SHARED_SPLASH,
    },
    android: {
      ...SHARED_SPLASH,
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#FFFFFF',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
  },
};
