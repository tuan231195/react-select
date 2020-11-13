import React, { useMemo, useState } from 'react';

export function withControl<
	Props extends { value?: any; defaultValue?: any; onChange?: any }
>(Component: React.FC<Props>) {
	return (props: Props) => {
		const isManaged = 'value' in props;
		const [unManagedValue, setUnManagedValue] = useState(
			props.defaultValue
		);
		return (
			<Component
				{...props}
				value={isManaged ? props.value : unManagedValue}
				onChange={(...args) => {
					const { value } = args[0] || {};
					if (!isManaged) {
						setUnManagedValue(value);
					}
					if (props.onChange) {
						props.onChange(...args);
					}
				}}
			/>
		);
	};
}

function debounce(inner, ms = 0) {
	let timer: any = null;
	let resolves: Function[] = [];

	return function(...args) {
		clearTimeout(timer);
		timer = setTimeout(async () => {
			const result = await inner(...args);
			resolves.forEach(r => r(result));
			resolves = [];
		}, ms);

		return new Promise(r => resolves.push(r));
	};
}

export function useDebounce(func, ms) {
	return useMemo(() => {
		return debounce(func, ms);
	}, [func, ms]);
}
