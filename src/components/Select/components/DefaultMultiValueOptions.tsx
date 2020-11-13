import React from 'react';
import { useSelect } from 'src/components/Select/context';
import { Icon } from 'src/components/Icons';
import styles from 'src/components/Select/Select.module.pcss';

export function DefaultMultiValueOptions({ item }) {
	const { optionToText, selectApi } = useSelect<any[]>();
	return (
		<div className={styles.multiSelectOption}>
			<div className={styles.multiSelectOptionText}>
				{optionToText(item)}
			</div>
			<button
				className={styles.multiCloseOptionButton}
				type={'button'}
				onClick={() => selectApi.onRemove(item)}
			>
				<Icon name={'close'} />
			</button>
		</div>
	);
}
