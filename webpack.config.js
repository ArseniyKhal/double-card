const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	entry: "./src/index.ts",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		clean: true,
	},
	mode: process.env.NODE_ENV === "production" ? "production" : "development",
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif)$/i,
				type: "asset/resource",
				generator: {
					filename: path.join("images", "[name].[contenthash][ext]"),
				},
			},
			{
				test: /\.svg$/,
				type: "asset/resource",
				generator: {
					filename: path.join("icons", "[name].[contenthash][ext]"),
				},
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	optimization: {
		minimizer: ["...", new CssMinimizerPlugin()],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].[contenthash].css",
		}),
	],
	devServer: {
		watchFiles: path.join(__dirname, "src"),
		port: 9000,
	},
};
