const WebpackBar = require('webpackbar');

module.exports = {
  webpack(config, { dev }) {
    if (dev) {
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
