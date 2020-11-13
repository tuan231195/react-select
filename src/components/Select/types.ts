import React from 'react';

export type SelectOption = {
	option: any;
	value: any;
	isNew?: boolean;
};

export type SelectProps = {
	options: { value: any; option: any }[];
	value?: any;
	components?: {
		singleValue?: React.FC<{ contentEditable?: React.ReactNode }>;
		option?: React.FC<{ item: SelectOption }>;
		multiValue?: React.FC<{ item: SelectOption }>;
	};
	placeholder?: string;
	multi?: boolean;
	loading?: boolean;
	onChange?: ({
		option,
		value,
		isRemove,
	}: {
		option: SelectOption | null;
		value: SelectOption['value'];
		isRemove?: boolean;
	}) => void;
	optionToText?: (option: SelectOption) => string;
	closeOnSelect?: boolean;
	showClear?: boolean;
	onSearch?: (search: string) => void;
	allowAdd?: boolean;
	onAdd?: (newOption: SelectOption) => void;
};

export type AsyncSelectProps = Omit<SelectProps, 'options'> & {
	asyncOptions: (search: string) => Promise<SelectOption[]>;
	options?: SelectOption[];
	debounce?: number;
};
