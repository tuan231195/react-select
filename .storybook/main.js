const path = require('path');

module.exports = {
	addons: [
		'@storybook/addon-actions/register',
		'@storybook/addon-knobs/register',
		'@storybook/addon-notes/register',
	],
	stories: ['../src/stories/*.stories.tsx'],
	webpackFinal(config) {
		config.module.rules.push({
			test: /\.(ts|tsx)$/,
			use: [
				{
					loader: require.resolve('babel-loader'),
				},
				{
					loader: require.resolve('react-docgen-typescript-loader'),
				},
			],
		});

		config.module.rules.push({
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
							localIdentName: '[name]__[local]--[hash:base64:5]',
						},
					},
				},
				{
					loader: 'postcss-loader',
				}
			],
			include: path.resolve(__dirname, '../src'),
		});

		config.resolve.extensions.push('.ts', '.tsx');

		config.resolve.alias = {
			...config.resolve.alias,
			'src': path.resolve(__dirname, '..', 'src'),
		};

		return config;
	},
};
