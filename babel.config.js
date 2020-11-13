module.exports = api => {
	api.cache(true);
	return {
		presets: [
			'@babel/typescript',
			'@babel/preset-react',
			'@babel/preset-env',
		],
		plugins: [
			'babel-plugin-styled-components',
			'@babel/proposal-class-properties',
			'@babel/proposal-object-rest-spread',
		],
	};
};
