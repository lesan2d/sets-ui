const path = require('path');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = () => {
	return {
		mode: 'production',
		entry: () => {
			const entry = {
				index: path.resolve(__dirname, '../../packages/theme-default'),
				animation: path.resolve(__dirname, '../../packages/theme-default/animation.scss'),
			};
			const componentsDir = path.resolve(__dirname, '../../packages/theme-default/src');
			const componentsName = fs.readdirSync(componentsDir);
			componentsName.forEach((name) => {
				entry[name] = {
					import: path.resolve(componentsDir, name),
				};
			});
			return entry;
		},
		output: {
			clean: true,
			path: path.resolve(__dirname, '../../dist/theme-default'),
			filename: (pathData) => {
				return pathData.chunk.name === 'index' ? '[name].js' : '[name]/[name].js';
			},
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: (pathData) => {
					return pathData.chunk.name === 'index' ? '[name].css' : '[name]/[name].css';
				},
			}),
		],
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
				{
					test: /\.css$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader'],
				},
				{
					test: /\.s[ac]ss$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
						},
						'css-loader',
            'sass-loader',
					],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
		},
		optimization: {
			minimize: true,
			minimizer: [
				new CssMinimizerPlugin(), // css压缩
			],
		},
	};
};
