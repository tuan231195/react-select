import React from 'react';

export type SelectOption = {
	option: any;
	value: any;
	isNew?: boolean;
};

export type SelectProps = {
	/**
	 * the list of options
	 */
	options: { value: any; option: any }[];
	/**
	 * The current value of the select input
	 */
	value?: any;
	/**
	 * Customizable components
	 */
	components?: {
		singleValue?: React.FC<{ contentEditable?: React.ReactNode }>;
		option?: React.FC<{ item: SelectOption }>;
		multiValue?: React.FC<{ item: SelectOption }>;
	};
	/**
	 * Input placeholder
	 */
	placeholder?: string;
	/**
	 * Whether to allow multiple selections
	 */
	multi?: boolean;
	/**
	 * Whether to show loading
	 */
	loading?: boolean;
	/**
	 * On Change callback
	 */
	onChange?: ({
		option,
		value,
		isRemove,
	}: {
		option: SelectOption | null;
		value: SelectOption['value'];
		isRemove?: boolean;
	}) => void;
	/**
	 * Convert option to a string
	 */
	optionToText?: (option: SelectOption) => string;
	/**
	 * Whether to close on select
	 */
	closeOnSelect?: boolean;
	/**
	 * Whether to show clear button
	 */
	showClear?: boolean;
	/**
	 * On user search callback
	 */
	onSearch?: (search: string) => void;
	/**
	 * Allow item's add
	 */
	allowAdd?: boolean;
	/**
	 * On add callback
	 */
	onAdd?: (newOption: SelectOption) => void;
};

export type AsyncSelectProps = Omit<SelectProps, 'options'> & {
	/**
	 * Query for options
	 */
	asyncOptions: (search: string) => Promise<SelectOption[]>;
	options?: SelectOption[];
	/**
	 * debounce in seconds
	 */
	debounce?: number;
};
