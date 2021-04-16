const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`
console.log('IS DEV:', isDev);
module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: './index.jsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$|.jsx$/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {},
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader'
            }
        ]
    },
    devServer: {
        port: 8080,
        hot: isDev,
        publicPath: "/",
        contentBase: "./public",
        hot: true
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: filename('html')
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')

        })
    ]
};
