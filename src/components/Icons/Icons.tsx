import React from 'react';

const iconsContext = require.context('src/icons/', true, /tsx$/);

export function Icon({ name, width = 16, height = 16, size = 16, ...props }) {
	if (size) {
		width = height = size;
	}
	const Icon = iconsContext(`./${name}.tsx`).default;
	return <Icon width={width} height={height} {...props} />;
}
