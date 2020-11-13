import React from 'react';
import { useSelect } from 'src/components/Select/context';
import styles from 'src/components/Select/Select.module.pcss';

export function OptionListComponent({
	selectBoxRef,
	component: OptionComponent,
}) {
	const { filteredItems: items, selectApi } = useSelect();
	return (
		<ul
			className={styles.dropdown}
			ref={selectBoxRef}
			style={{
				top: '100%',
				left: 0,
			}}
		>
			{items.map(item => (
				<li
					className={styles.listOptionWrapper}
					key={item.value}
					tabIndex={0}
					onKeyDown={e => {
						if (e.key === 'Enter') {
							selectApi.select(item);
						}
					}}
					onMouseDown={() => {
						selectApi.select(item);
					}}
				>
					<OptionComponent item={item} />
				</li>
			))}
		</ul>
	);
}
