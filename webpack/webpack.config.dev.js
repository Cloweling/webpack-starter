const path = require('path');
const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    devtool: 'eval-cheap-module-source-map',
    mode: 'development',
    devServer: {
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader?sourceMap=true',
                    'sass-loader'
                ]
            },
            { 
                test: /\.js$/, 
                include: path.resolve(__dirname, '../src'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                  emitWarning: true
                }
            }
        ]
    },
    plugins: []
});