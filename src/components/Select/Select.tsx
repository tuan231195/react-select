import React, { useEffect, useRef } from 'react';
import { useLatest, useStateRef } from 'src/utils/hooks/basic';
import { noop } from 'src/utils/functions';
import { SingleSelectBox } from 'src/components/Select/components/SingleSelectBox';
import { MultiSelectBox } from 'src/components/Select/components/MultiSelectBox';
import { DefaultOptionRender } from 'src/components/Select/components/DefaultOptionRenderer';
import { isEmpty, isSelected } from 'src/components/Select/utils';
import { DefaultMultiValueOptions } from 'src/components/Select/components/DefaultMultiValueOptions';
import { OptionListComponent } from 'src/components/Select/components/OptionList';
import styles from './Select.module.pcss';
import { SelectOption, SelectProps } from 'src/components/Select/types';
import { SelectContext, SelectContextType } from './context';
import { Icon } from 'src/components/Icons';
import { withControl } from 'src/utils/hoc/with-controlled';

export const Select = withControl<SelectProps>(SelectComponent);
export const RawSelect = SelectComponent;

function SelectComponent({
	options: items,
	value = [],
	closeOnSelect = true,
	showClear = false,
	allowAdd = false,
	onAdd = noop,
	placeholder = '',
	loading = false,
	onSearch = noop,
	components = {
		option: DefaultOptionRender,
	},
	multi = false,
	optionToText = item => item?.option || '',
	onChange = noop,
}: SelectProps) {
	const defaultValue = multi ? [] : null;
	const [searchInputGetter, setSearchInput] = useStateRef('');
	const [isOpenGetter, setOpen] = useStateRef(false);
	const rootRef = useRef<any>();
	const searchInputRef = useRef<any>();
	const selectBoxRef = useRef<any>();
	const selectApiRef = useLatest<SelectContextType<any>['selectApi']>({
		focusSearchInput,
		select,
		setOpen,
		setSearchInput,
		onSearch,
		onChange,
		onAdd,
		onRemove: item => {
			onChange({
				option: item,
				value: value.filter(element => element !== item.value),
				isRemove: true,
			});
		},
	});
	const searchInput = searchInputGetter();

	const isOpen = isOpenGetter();

	const filteredItems = filterOptions({
		items,
		optionToText,
		searchInput,
	});

	if (allowAdd && !filteredItems.length) {
		filteredItems.push({
			option: searchInput,
			value: searchInput,
			isNew: true,
		});
	}

	useEffect(() => {
		if (!isOpenGetter()) {
			setSearchInput('');
		}
		if (isOpenGetter()) {
			document.addEventListener('keydown', keyHandler);
			document.addEventListener('click', clickHandler);
		}
		return () => {
			document.removeEventListener('keydown', keyHandler);
			document.removeEventListener('click', clickHandler);
		};

		function keyHandler(e) {
			if (e.key === 'Escape') {
				return setOpen(false);
			}
			if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
				e.preventDefault();
				if (selectBoxRef.current) {
					const listElements: HTMLLIElement[] = Array.from(
						selectBoxRef.current.querySelectorAll('li')
					);
					if (!listElements.length) {
						return;
					}
					const direction = e.key === 'ArrowDown' ? 1 : -1;
					const activeElement: any = document.activeElement;

					if (!listElements.includes(activeElement)) {
						listElements[0].focus();
					} else {
						const activeIndex = listElements.indexOf(activeElement);
						const newIndex = activeIndex + direction;
						if (newIndex < listElements.length && newIndex >= 0) {
							listElements[newIndex].focus();
						}
						if (direction === -1 && newIndex < 0) {
							selectApiRef.current.focusSearchInput();
						}
					}
				}
			}
		}

		function clickHandler(e) {
			if (rootRef.current?.contains(e.target)) {
				return;
			}
			setOpen(false);
		}
	}, [isOpen, isOpenGetter, selectApiRef, setOpen, setSearchInput]);

	const selectedOptions = items.filter(item =>
		isSelected({ item, selectedValue: value })
	);

	const SingleValueComponent = components?.singleValue;
	const OptionComponent = components?.option || DefaultOptionRender;
	const MultiValueComponent =
		components?.multiValue || DefaultMultiValueOptions;

	return (
		<SelectContext.Provider
			value={{
				optionToText,
				multi,
				allowAdd,
				selectApi: selectApiRef.current,
				value,
				filteredItems,
				get isOpen() {
					return isOpenGetter();
				},
				get searchInput() {
					return searchInputGetter();
				},
				selectedOptions,
				placeholder,
			}}
		>
			<div className={styles.root} ref={rootRef}>
				<div className={styles.selectBoxContainer}>
					<div className={styles.selectBox}>
						{multi && (
							<MultiSelectBox
								component={MultiValueComponent}
								inputRef={searchInputRef}
							/>
						)}
						{!multi && (
							<SingleSelectBox
								component={SingleValueComponent}
								inputRef={searchInputRef}
							/>
						)}
					</div>

					{!loading &&
						showClear &&
						(searchInputGetter() || !isEmpty(value)) && (
							<button
								className={styles.closeAll}
								type={'button'}
								onClick={() => {
									selectApiRef.current.onChange({
										value: defaultValue,
										option: null,
									});
									selectApiRef.current.setSearchInput('');
									selectApiRef.current.onSearch('');
									selectApiRef.current.setOpen(false);
								}}
							>
								<Icon name={'close'} />
							</button>
						)}
					{loading && (
						<Icon
							className={styles.loadingIcon}
							name={'spinner'}
							size={20}
						/>
					)}

					<button
						className={styles.arrowButton}
						type={'button'}
						onClick={e => {
							selectApiRef.current.setOpen(!isOpenGetter());
							e.stopPropagation();
						}}
					>
						<Icon name={'chevron-down'} />
					</button>
				</div>
				{isOpenGetter() && !!filteredItems.length && (
					<OptionListComponent
						selectBoxRef={selectBoxRef}
						component={OptionComponent}
					/>
				)}
			</div>
		</SelectContext.Provider>
	);

	function focusSearchInput() {
		setTimeout(() => {
			const searchInputElement = searchInputRef.current?.el
				? searchInputRef.current.el.current
				: searchInputRef.current;
			if (document.activeElement === searchInputElement) {
				return;
			}
			searchInputElement.focus();
		});
	}

	function select(item: SelectOption) {
		let selectedValue = item.value;
		if (item.isNew) {
			selectApiRef.current.onAdd({
				option: item.option,
				value: item.value,
			});
		}
		if (multi) {
			if (!isSelected({ item, selectedValue: value })) {
				selectedValue = (value || [])
					.concat(item.value)
					.filter(v => v != undefined);
			} else {
				selectedValue = value || [];
			}
		}
		selectApiRef.current.onChange({ value: selectedValue, option: item });
		selectApiRef.current.setSearchInput('');

		if (closeOnSelect) {
			selectApiRef.current.setOpen(false);
		} else {
			selectApiRef.current.focusSearchInput();
		}
	}
}

function filterOptions({ items, optionToText, searchInput = '' }) {
	return items.filter(item =>
		optionToText(item)
			.toLocaleLowerCase()
			.includes(searchInput.toLocaleLowerCase())
	);
}
