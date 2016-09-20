const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
const srcPath = './src'
const buildPath = '/build'

module.exports = {
    devtool: 'eval-source-map',

    entry: {
        main: __dirname + '/src/js/main.js',
        popup: __dirname + '/src/js/popup.js'
    },
    output: {
        path: __dirname + buildPath,
        filename: '[name].js'
    },

    module: {
        loaders: [{
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192'
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose?jQuery!expose?$'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'image-webpack'
                ]
            }
        ]
    },

    vue: {
        loaders: {
            js: 'babel'
        }
    },

    postcss: [],

    sassLoader: {
        includePaths: [path.resolve(__dirname, srcPath)]
    },

    imageWebpackLoader: {
        pngquant: {
            quality: '65-90',
            speed: 4
        },
        jpegtran: {
            progressive: false
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: __dirname + '/src/popup.tmpl.html',
            excludeChunks: ['main']
        }),
        new ExtractTextPlugin('[name].css'),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]

}