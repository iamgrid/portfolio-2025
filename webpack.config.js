const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/portfolio_assets/index.js",
	output: {
		filename: "portfolio_assets/iamgrid.bundle.[contenthash].js",
		path: path.resolve(__dirname, "dist"),
		clean: true, // Clean the output directory before emit
		hashDigestLength: 8,
	},
	devServer: {
		port: 8080,
		open: true,
		static: {
			directory: path.join(__dirname, "./src/portfolio_assets"),
			publicPath: "/portfolio_assets",
		},
		hot: false, // Disable hot module replacement
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: false, // disable url processing
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: "./src/portfolio_assets",
					to: "portfolio_assets",
					globOptions: {
						ignore: ["**/*.js", "**/*.css"],
					},
				},
			],
		}),
		new MiniCssExtractPlugin({
			filename: "portfolio_assets/iamgrid.bundle.[contenthash].css",
		}),
	],
};
