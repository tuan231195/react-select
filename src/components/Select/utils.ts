import { SelectOption } from 'src/components/Select/types';

export function isEmpty(value) {
	if (value == null) {
		return true;
	}
	return !value?.length;
}

export function isSelected({
	item,
	selectedValue,
}: {
	item: SelectOption;
	selectedValue: any[] | any;
}) {
	if (isEmpty(selectedValue)) {
		return false;
	}
	if (Array.isArray(selectedValue)) {
		return selectedValue.includes(item.value);
	}
	return selectedValue === item.value;
}
