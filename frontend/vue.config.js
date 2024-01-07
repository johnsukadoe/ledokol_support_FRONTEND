const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = {
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        implementation: require('sass'),
        additionalData: ``, 
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  },
};
