import React from 'react';

export default function ChevronDown(props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width || 32}
			height={props.height || 32}
			viewBox="0 0 24 24"
			className={props.className}
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	);
}
