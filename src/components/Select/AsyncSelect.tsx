import React from 'react';
import { useEffect, useState } from 'react';
import { Select } from 'src/components';
import { AsyncSelectProps } from 'src/components/Select/types';
import { useDebounce } from 'src/utils/hoc/with-controlled';

export function AsyncSelect({
	asyncOptions,
	debounce = 800,
	...props
}: AsyncSelectProps) {
	const [searchInput, setSearchInput] = useState('');
	const [options, setOptions] = useState(props.options || []);
	const [loading, setLoading] = useState(false);

	const debouncedGetOptions = useDebounce(asyncOptions, debounce);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const options: any = await debouncedGetOptions(searchInput);
				setOptions(options);
			} finally {
				setLoading(false);
			}
		})();
	}, [debouncedGetOptions, searchInput]);

	return (
		<Select
			{...props}
			loading={loading}
			onSearch={setSearchInput}
			options={options}
		/>
	);
}
