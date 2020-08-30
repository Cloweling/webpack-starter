const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin()]
    },
    output: {
        filename: 'app.[contentHash].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: /styles\.css$/,
                use: [
                    'style-loader',
                    'css-loader'    
                ]
            },
            {
                test: /styles\.css$/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'    
                ]
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                use: [
                    'babel-loader'
                ]
            }

        ]
    },
    plugins: [
        new MiniCSSExtractPlugin({
            filename: 'app.[contentHash].css',
            ignoreOreder: false
        }),
        new MinifyPlugin()
    ]
});