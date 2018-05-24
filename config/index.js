var path = require('path');
var os = require('os');
var networkInterfaces = os.networkInterfaces();
var ip;

for (var key in networkInterfaces) {
  networkInterfaces[key].forEach(item => {
    if (!item.internal && item.family === 'IPv4') {
      ip = item.address;
    }
  });
}

module.exports = {
  build: {
    env: require('./prod.env'),
    port: 8088,
    index: path.resolve(__dirname, '../nebulas-card/index.html'),
    assetsRoot: path.resolve(__dirname, '../nebulas-card'),
    assetsSubDirectory: 'static',     
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 8083,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/myb-mos-api': {
            // target: 'http://112.126.86.218:8080',
            target: 'http://101.201.42.115:8989',
            
            changeOrigin: true,
            //重写路径 
            // pathRewrite： { ' ^ / old / api ' ： ' / new / api ' }
            // // remove path 
            // pathRewrite： { ' ^ / remove / api ' ： ' ' }
            // //添加基本​​路径 
            // pathRewrite： { ' ^ / ' ： ' / basepath / ' }
            // //自定义重写
            // pathRewrite ： function（ path， req）{ return  path。replace（ ' / api '， ' / base / api '）}
            pathRewrite: {
              '^/api': '/api'
            }
        },
        '/mos_afb': {
            target: 'http://60.205.94.254:8080',
            // target: 'http://mos.meiyebang.com:8777',
            // target: 'http://192.168.64.55:8080/',
            changeOrigin: true,
            pathRewrite: {
              '^/mos_afb': '/mos_afb'
            }
        }
        // '/statistics': {
        //     target: 'http://60.205.94.254:8080',
        //     // target: 'http://192.168.64.55:8080/',
        //     changeOrigin: true
        // }
    },
    cssSourceMap: false
  }
}
