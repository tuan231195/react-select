import React from 'react';
import { isSelected } from 'src/components/Select/utils';
import { useSelect } from 'src/components/Select/context';
import styles from 'src/components/Select/Select.module.pcss';
import classnames from 'classnames';

export function DefaultOptionRender({ item }) {
	const { value: selectedValue, optionToText } = useSelect<any[]>();
	return (
		<div
			className={classnames(styles.listOption, {
				[styles.listOptionSelected]: isSelected({
					item,
					selectedValue,
				}),
			})}
		>
			<div className={styles.listOptionText}>
				{item.isNew ? `Add ${optionToText(item)}` : optionToText(item)}
			</div>
		</div>
	);
}
