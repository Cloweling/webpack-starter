const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
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
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    attributes: false,
                    minimize: false
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false
                        }
                    }
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
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: 'app.[contentHash].css',
            ignoreOreder: false
        }),
        new CopyPlugin({
            patterns:  [
                { from: 'src/assets', to: 'assets' }
            ]
        }),
        new MinifyPlugin(),
        new CleanWebpackPlugin()
    ]
}