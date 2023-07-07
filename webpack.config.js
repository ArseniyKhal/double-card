const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
	entry: path.resolve(__dirname, './src/index.js'),
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		clean: true,
		assetModuleFilename: '[name][ext]',
	},
	mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	// mode: 'production',
	module: {
		rules: [
			{
				test: /\.scss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
		],
	},
	optimization: {
		minimizer: ['...', new CssMinimizerPlugin()],
	},
	plugins: [
		new CopyPlugin({
			patterns: [{ from: 'static', to: 'static' }],
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new MiniCssExtractPlugin(),
	],
};
