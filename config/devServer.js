const path = require('path');
module.exports = {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000, //端口号
    open: false, //自动打开浏览器
    host: '127.0.0.1',
    hot: true,
    quiet: true,
    disableHostCheck: true, // 绕过主机检查
    clientLogLevel : 'none', // 清楚log
}