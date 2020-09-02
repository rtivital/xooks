module.exports = {
  env: {
    test: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-export-default-from'],
    },

    production: {
      presets: [['@babel/preset-env', { modules: false }]],
      plugins: ['@babel/plugin-proposal-export-default-from'],
    },
  },
};
