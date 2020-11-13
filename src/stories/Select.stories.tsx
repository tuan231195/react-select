import React, { useState } from 'react';
import { RawSelect } from 'src/components/Select/Select';
import { AsyncSelect, Select, SelectOption } from 'src/index';
import { useSelect } from 'src/components/Select/context';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import 'tailwindcss/dist/tailwind.min.css';

export default {
	title: 'Components/Select',
	component: RawSelect,
	decorators: [withKnobs],
};

const simpleOptions = [
	{
		option: 'JavaScript',
		value: 'js',
	},
	{
		option: 'Python',
		value: 'py',
	},
	{
		option: 'C++',
		value: 'c++',
	},
];

export const UnManagedSelectStory = () => {
	return (
		<Select
			showClear={boolean('Show Clear', true)}
			closeOnSelect={boolean('Close on Select', true)}
			placeholder={text('Placeholder', 'Add Values')}
			multi={boolean('Multi', false)}
			options={simpleOptions}
		/>
	);
};

UnManagedSelectStory.storyName = 'Unmanaged Select';

export const MultiSelectStory = () => {
	const [value, setValue] = useState([]);
	return (
		<Select
			showClear={boolean('Show Clear', true)}
			closeOnSelect={boolean('Close on Select', true)}
			placeholder={text('Placeholder', 'Add Values')}
			value={value}
			multi={true}
			onChange={({ value }) => setValue(value)}
			options={simpleOptions}
		/>
	);
};

MultiSelectStory.storyName = 'Multi Select';

export const SingleSelectStory = () => {
	const [value, setValue] = useState('');
	return (
		<Select
			showClear={boolean('Show Clear', true)}
			closeOnSelect={boolean('Close on Select', true)}
			value={value}
			placeholder={text('Placeholder', 'Add Values')}
			multi={false}
			onChange={({ value }) => setValue(value)}
			options={simpleOptions}
		/>
	);
};

SingleSelectStory.storyName = 'Single Select';

export const AsyncSelectStory = () => {
	const [value, setValue] = useState('');
	return (
		<AsyncSelect
			asyncOptions={getOptions}
			showClear={boolean('Show Clear', true)}
			closeOnSelect={boolean('Close on Select', true)}
			value={value}
			placeholder={text('Placeholder', 'Add Values')}
			multi={false}
			onChange={({ value }) => setValue(value)}
		/>
	);
};

AsyncSelectStory.storyName = 'Async Select';

export const AllowAddStory = () => {
	const [value, setValue] = useState('');
	const [options, setOptions] = useState(simpleOptions);
	return (
		<Select
			showClear={boolean('Show Clear', true)}
			closeOnSelect={boolean('Close on Select', true)}
			value={value}
			placeholder={text('Placeholder', 'Add Values')}
			multi={boolean('Multi', false)}
			allowAdd={true}
			onAdd={option => setOptions([...options, option])}
			onChange={({ value }) => setValue(value)}
			options={options}
		/>
	);
};

AllowAddStory.storyName = 'Allow Add';

function getOptions(searchInput = ''): Promise<SelectOption[]> {
	if (!searchInput) {
		return Promise.resolve([]);
	}
	const randomOptions = Array.from({ length: 10 }).map((v, i) => {
		const option = searchInput.charAt(0) + i;
		return {
			option,
			value: option,
		};
	});
	return sleepAndResolve(randomOptions, 1000);
}

function sleepAndResolve<T>(result: T, ms): Promise<T> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve(result);
		}, ms);
	});
}

export const LoadingSelectStory = () => {
	const [value, setValue] = useState('');
	return (
		<Select
			showClear={boolean('Show Clear', true)}
			closeOnSelect={boolean('Close on Select', true)}
			placeholder={text('Placeholder', 'Add Values')}
			value={value}
			multi={false}
			loading={true}
			onChange={({ value }) => setValue(value)}
			options={simpleOptions}
		/>
	);
};

LoadingSelectStory.storyName = 'Loading Select';

export const CustomSingleSelectStory = () => {
	const [value, setValue] = useState(null);
	return (
		<>
			<Select
				showClear={boolean('Show Clear', true)}
				closeOnSelect={boolean('Close on Select', true)}
				placeholder={text('Placeholder', 'Add Values')}
				multi={boolean('Multi', false)}
				value={value}
				onChange={({ value }) => setValue(value)}
				options={[
					{
						option: {
							avatar:
								'https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png',
							name: 'Javascript',
						},
						value: 'js',
					},
					{
						option: {
							avatar:
								'https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png',
							name: 'Python',
						},
						value: 'py',
					},
					{
						option: {
							avatar:
								'https://pickaface.net/gallery/avatar/unr_random_180410_1905_z1exb.png',
							name: 'C++',
						},
						value: 'c++',
					},
				]}
				optionToText={({ option: { name } }) => name}
				components={{
					singleValue: CustomSingleSelectRenderer,
					option: CustomOptionRenderer,
				}}
			/>
		</>
	);
};

CustomSingleSelectStory.storyName = 'Custom Single Select';

function CustomSingleSelectRenderer({
	contentEditable,
}: {
	contentEditable?: React.ReactNode;
}) {
	const { selectedOptions } = useSelect();
	const selectedOption = selectedOptions[0];
	return (
		<span className={'flex items-center'}>
			{selectedOption?.option?.avatar && (
				<Avatar src={selectedOption.option.avatar} />
			)}
			<span className={'flex-grow'}>{contentEditable}</span>
		</span>
	);
}

function CustomOptionRenderer({
	item: {
		option: { name, avatar },
	},
}: {
	item: any;
}) {
	return (
		<span className={'flex p-2 items-center'}>
			<Avatar src={avatar} />
			<span className={'ml-2 flex-grow'}>{name}</span>
		</span>
	);
}

function Avatar({ src }) {
	return (
		<div className={'w-8 h-8 relative'}>
			<div
				className={
					'w-full h-full rounded-full overflow-hidden shadow-inner text-center bg-purple-200 table cursor-pointer'
				}
			>
				<span className={'hidden text-white font-bold align-middle'}>
					KR
				</span>
				<img
					src={src}
					alt="lovely avatar"
					className={
						'object-cover object-center w-full h-full visible'
					}
				/>
			</div>
		</div>
	);
}
