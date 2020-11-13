import React from 'react';
import { ContentEditableBox } from 'src/components/Select/components/ContentEditableBox';
import { useSelect } from 'src/components/Select/context';

export function MultiSelectBox({ component: MultiValueComponent, inputRef }) {
	const { selectedOptions } = useSelect<any[]>();

	return (
		<>
			{selectedOptions.map(option => (
				<MultiValueComponent key={option.value} item={option} />
			))}
			<ContentEditableBox inputRef={inputRef} />
		</>
	);
}
