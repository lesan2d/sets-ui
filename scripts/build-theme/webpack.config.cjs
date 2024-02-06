const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = () => {
	return {
		mode: 'production',
		entry: path.resolve(__dirname, '../../packages/theme-default/index.js'),
		output: {
			path: path.resolve(__dirname, '../../sets-ui/dist/theme'),
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'index.css',
				chunkFilename: '[id].css',
			}),
		],
		module: {
			rules: [
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {},
						},
						'css-loader',
					],
				},
			],
		},
		optimization: {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(), // css压缩
			],
		},
	};
};
