const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'quasar'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:80/app_database',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        logLevel: 'debug'
      }
    }
  },

  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  }
})
