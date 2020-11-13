import React from 'react';

export default function Spinner(props) {
	return (
		<svg
			viewBox="0 0 100 100"
			preserveAspectRatio="xMidYMid"
			width={props.width || 32}
			height={props.height || 32}
			className={props.className}
		>
			<g>
				<path
					d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"
					fill="none"
					stroke="currentColor"
					strokeWidth="7"
				/>
				<path d="M49 3L49 27L61 15L49 3" fill="currentColor" />
				<animateTransform
					attributeName="transform"
					type="rotate"
					repeatCount="indefinite"
					dur="1s"
					values="0 50 50;360 50 50"
					keyTimes="0;1"
				/>
			</g>
		</svg>
	);
}
