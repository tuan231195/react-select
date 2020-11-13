const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/index.ts',
	mode: 'production',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './index.js',
		libraryTarget: 'umd',
	},
	devtool: 'source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
					},
				],
			},
			{
				test: /\.module.pcss$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1,
							modules: {
								localIdentName:
									'[name]__[local]--[hash:base64:5]',
							},
						},
					},
					{
						loader: 'postcss-loader',
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
						},
					},
				],
			},
		],
	},
	externals: {
		react: 'react',
		'react-dom': 'react-dom',
		'prop-types': 'prop-types',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			src: path.resolve(__dirname, 'src'),
		},
	},
	plugins: [new CleanWebpackPlugin()],
};
