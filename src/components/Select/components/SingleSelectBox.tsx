import React from 'react';
import { ContentEditableBox } from 'src/components/Select/components/ContentEditableBox';
import styles from 'src/components/Select/Select.module.pcss';
import { useSelect } from 'src/components/Select/context';

export function SingleSelectBox({ component: SingleValueComponent, inputRef }) {
	const { selectedOptions, isOpen } = useSelect();
	const selectedOption = selectedOptions[0];
	const showCustomSelect = !isOpen && SingleValueComponent && selectedOption;
	return (
		<div className={styles.singleSelectBox}>
			{!showCustomSelect && <ContentEditableBox inputRef={inputRef} />}
			{showCustomSelect && (
				<SingleValueComponent
					contentEditable={<ContentEditableBox inputRef={inputRef} />}
				/>
			)}
		</div>
	);
}
