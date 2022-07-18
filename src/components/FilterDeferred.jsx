import { useState, useDeferredValue } from 'react';

import SearchResults from './SearchResults';


const FilterDeferred = (props) => {
	const [search, setSearch] = useState('');

	const deferredData = useDeferredValue(search);

	const handleChange = (event) => {
		console.count('FilterDeferred')
		setSearch(event.target.value);
	};

	return (
		<div>
			<h2>FilterDeferred</h2>
			<input type='search' placeholder='Search' value={search} onChange={handleChange} />
			<SearchResults search={deferredData} data={props.data} />
		</div>
	);
};

export default FilterDeferred;
