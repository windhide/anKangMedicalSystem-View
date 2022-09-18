const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports = { 
    devServer: {
        open: false,
        port: 80, //端口
        proxy: {
            '/api': {
                target: 'http://192.168.190.130:10010/', // 服务器server
                ws: false, // proxy websockets 
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    '^/api': '' // rewrite path
                }
            },
        },
    }
}