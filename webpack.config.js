const path = require('path');
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const baseConfig = process.env.NODE_ENV == 'production' ? require('./config/pro.config.js') : require('./config/dev.config.js')
module.exports = {
    mode:'production',
    entry:{
        index:'./js/index.js',
        login:'./js/login.js'
    },
    output:{
        filename: 'js/[name].[contenthash].js',
        path: path.resolve(__dirname, './dist')
    },
    module:{
        rules: [
            {
                test:/\.css$/, 
                use:[
                    {
                        loader:process.env.NODE_ENV  =='production' ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    'css-loader',
                    'less-loader']
            },
            {
                test:/\.less$/, 
                use:[
                    {
                        loader:process.env.NODE_ENV  =='production' ? MiniCssExtractPlugin.loader : 'style-loader'
                    },
                    'css-loader',
                    'less-loader']
            },
            {
                test:/\.vue$/, 
                loader:'vue-loader'
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env' : baseConfig
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({filename:'css/[name].[contenthash].css'}),
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, './pages/index.html'),
                filename:"index.html",
                chunks:['index']
            }
        ),
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, './pages/login.html'),
                filename:"login.html",
                chunks:['login']
            }
        ),
    ],
    devServer: merge( {}, // 搭配 webpack-dev-server 使用
        //项目构建后的路径
        require('./config/devServer.js')
        // 启动gzip压缩
    )
}