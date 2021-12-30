module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: [
          'react-native-paper/babel',
          'module:react-native-dotenv',
          {
            moduleName: '@env',
            path: '.env',
            blacklist: ['API_URL'],
            whitelist: null,
            safe: false,
            allowUndefined: true
          }
        ]
      }
    }
  };
};
