const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
	const mode = argv && argv.mode === 'production' ? 'production' : 'development';
	const isDevBuild = mode === 'development';
	const outputDir = './dist';

	return [{
		mode: mode,
		devtool: isDevBuild ? false : 'source-map',
		stats: {
			modules: false
		},
		context: __dirname,
		resolve: {
			extensions: ['.ts']
		},
		entry: './scripts/site.ts',
		output: {
			filename: isDevBuild ? 'bundle.js' : 'bundle.min.js',
			path: path.join(__dirname, outputDir)
		},
		plugins: [
			new CheckerPlugin(),
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: isDevBuild ? 'bundle.css' : 'bundle.min.css',
				path: path.join(__dirname, outputDir)
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify(isDevBuild ? 'development' : 'production')
				}
			})
		],
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'awesome-typescript-loader?silent=true'
				},
				{
					test: /\.css/,
					loader: [
						MiniCssExtractPlugin.loader,
						'css-loader'
					]
				}
			]
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					cache: true,
					parallel: true,
					sourceMap: true,
					terserOptions: {
						ecma: 6,
						output: {
							comments: false
						},
						compress: {
							dead_code: true,
							drop_console: false
						},
						mangle: true
					}
				}),
				new OptimizeCSSAssetsPlugin({
					cssProcessorOptions: {
						map: {
							inline: false
						}
					}
				})
			]
		}
	}];
};
