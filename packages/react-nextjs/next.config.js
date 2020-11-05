module.exports = {
  webpack(config) {
    if (+process.env.PROGRESS) {
      const WebpackBar = require('webpackbar');

      config.plugins.push(
        new WebpackBar({
          fancy: true,
          profile: true,
          basic: false
        })
      );
    }

    return config;
  }
};
