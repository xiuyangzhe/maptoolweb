// vue.config.js
module.exports = {
    devServer: {
        proxy: {
            '/mapdata': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                logLevel: "debug",
            }
        }
    }
}
