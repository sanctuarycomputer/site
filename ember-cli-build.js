/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var env = EmberApp.env() || 'development';
  var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

  var fingerprintOptions = {
    enabled: true,
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'svg'],
    exclude: ['images/smoke']
  };

  var origin;
  switch (env) {
    case 'development':
      origin = `http://${process.env.EMBER_HOST || 'localhost'}:4200/`;
      fingerprintOptions.prepend = origin;
    break;
    case 'staging':
      origin = 'TBC';
      fingerprintOptions.prepend = 'TBC';
    break;
    case 'production':
      origin = 'TBC';
      fingerprintOptions.prepend = 'TBC';
    break;
  }

  var app = new EmberApp(defaults, {
    dotEnv: {
      clientAllowedKeys: ['SANCTUARY_SPACE_ID', 'SANCTUARY_API_KEY', 'SANCTUARY_PREVIEW_API_KEY']
    },
    origin: origin,
    SRI: {
      crossorigin: 'use-credentials',
      runsIn: ['production', 'staging', 'test'],
    },
    babel: {
      plugins: [
        'transform-object-rest-spread'
      ]
    },
    fingerprint: fingerprintOptions,
    sourcemaps: {
      enabled: !isProductionLikeBuild,
    },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },
    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild
  });

  return app.toTree();
};
