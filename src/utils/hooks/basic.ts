import { MutableRefObject, useCallback, useRef, useState } from 'react';

export function useStateRef<T>(
	initialValue: T
): [() => T, (value: any) => void] {
	const [state, setState] = useState<T>(initialValue);
	const ref = useRef(state);
	ref.current = state;
	const getValue = useCallback(() => ref.current, []);
	return [getValue, setState];
}

export function useLatest<T>(value: T): MutableRefObject<T> {
	const ref = useRef<T>(value);
	ref.current = value;
	return ref;
}
