import { useState, useTransition } from 'react';

import SearchResults from './SearchResults';



const FilterTransition = (props) => {
	const [search, setSearch] = useState('');
	const [isPending, startTransition] = useTransition();

	return (
		<div>
			<h2>FilterTransition</h2>
			<input type='search' placeholder='Search' value={search} onChange={(event) => {
				startTransition(() => {
					console.count('FilterTransition')
					setSearch(event.target.value);
				})
			}} />
			{isPending
				? <div className='pending'>Pending....</div>
				: <SearchResults search={search} data={props.data} />
			}
		</div>
	);
};

export default FilterTransition;
