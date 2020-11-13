import { isEmpty } from 'src/components/Select/utils';
import React from 'react';
import { useSelect } from 'src/components/Select/context';
import { noop } from 'src/utils/functions';
import ContentEditable from '@vdtn359/content-editable';
import styles from 'src/components/Select/Select.module.pcss';
import classnames from 'classnames';

export function ContentEditableBox({ inputRef, onFocus = noop }) {
	const ref = useSelect();
	const {
		searchInput,
		selectApi,
		isOpen,
		value,
		placeholder,
		optionToText,
		multi,
		selectedOptions,
	} = ref;
	const selectedOption = selectedOptions[0];
	return (
		<ContentEditable
			html={
				multi
					? searchInput
					: searchInput ||
					  (selectedOption && optionToText(selectedOption)) ||
					  ''
			}
			ref={inputRef}
			placeholder={placeholder}
			onKeyDown={e => {
				if (e.key === 'Enter') {
					e.preventDefault();
				}
			}}
			onKeyPress={(e: any) => {
				if (!multi) {
					if (!ref.searchInput) {
						e.target.innerText = '';
					}
				}
			}}
			onInput={(e: any) => {
				if (!isOpen) {
					selectApi.setOpen(true);
				}
				selectApi.setSearchInput(e.target.innerText);
				selectApi.onSearch(e.target.innerText);
			}}
			className={classnames(styles.contentEditable, {
				'hide-placeholder': !isEmpty(value),
			})}
			onFocus={() => {
				onFocus(true);
				selectApi.setOpen(true);
			}}
			onBlur={() => {
				onFocus(false);
			}}
		/>
	);
}
