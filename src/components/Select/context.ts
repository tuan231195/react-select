import React from 'react';
import { SelectOption, SelectProps } from 'src/components/Select/types';

export function useSelect<T>() {
	return React.useContext(SelectContext) as SelectContextType<T>;
}

export type SelectContextType<T> = {
	value: T;
	placeholder?: string;
	searchInput: string;
	allowAdd?: boolean;
	optionToText: (value: SelectOption) => string;
	isOpen: boolean;
	multi: boolean;
	selectApi: {
		onRemove: (value: SelectOption) => void;
		select: (value: SelectOption) => void;
		focusSearchInput: () => void;
		onChange: NonNullable<SelectProps['onChange']>;
		onSearch: NonNullable<SelectProps['onSearch']>;
		onAdd: NonNullable<SelectProps['onAdd']>;
		setOpen: (isOpen: boolean) => void;
		setSearchInput: (searchInput: string) => void;
	};
	selectedOptions: SelectOption[];
	filteredItems: SelectOption[];
};

export const SelectContext = React.createContext<SelectContextType<any>>(
	null as any
);
