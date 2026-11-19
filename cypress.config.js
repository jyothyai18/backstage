
const { defineConfig } = require('cypress');
const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const path = require('path');

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 60000,
  video: false,

  e2e: {
    baseUrl:
      process.env.CYPRESS_BASE_URL || 'http://localhost:3000',

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    supportFile: false,

    setupNodeEvents(on, config) {
      const webpackOptions = {
        mode: 'development',

        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.jsx'],
        },

        module: {
          rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              use: [
                {
                  loader: require.resolve('ts-loader'),
                  options: {
                    transpileOnly: true,
                    configFile: path.resolve(
                      __dirname,
                      'cypress/tsconfig.json'
                    ),
                    onlyCompileBundledFiles: true,
                  },
                },
              ],
            },
          ],
        },
      };

      on(
        'file:preprocessor',
        webpackPreprocessor({ webpackOptions })
      );

      return config;
    },
  },
});
