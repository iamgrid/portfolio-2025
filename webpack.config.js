const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "iamgrid.bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true, // Clean the output directory before emit
	},
	devServer: {
		port: 8080,
		open: true,
		static: {
			directory: path.join(__dirname, "./assets"),
			publicPath: "/assets",
		},
		hot: false, // Disable hot module replacement
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "./src/assets", to: "assets" },
				{ from: "./src/favicon.ico", to: "favicon.ico" },
			],
		}),
		new MiniCssExtractPlugin({
			filename: "iamgrid.bundle.[contenthash].css",
		}),
	],
};
