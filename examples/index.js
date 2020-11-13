import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Select } from '../dist';

function App() {
	const [value, setValue] = useState(null);
	return (
		<div>
			<Select
				showClear={true}
				value={value}
				onChange={({ value }) => setValue(value)}
				options={[
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
				]}
			/>
		</div>
	);
}
ReactDOM.render(<App />, document.getElementById('root'));
