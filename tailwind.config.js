module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	purge: ['./src/**/*.tsx', './src/**/*.ts'],
	variants: {},
	plugins: [],
	corePlugins: {
		container: true,
	},
	theme: {
		extend: {
			maxHeight: {
				150: '150px',
				200: '200px',
				250: '250px',
				300: '300px',
			},
		},
	},
};
