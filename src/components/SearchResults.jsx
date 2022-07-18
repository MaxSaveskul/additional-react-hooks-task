import { useMemo } from 'react';


const SearchResults = ({ search, data }) => {
	const filterArray = useMemo(() => data
		.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())), [search, data]);
	return (
		<div>
			<ul>
				{data.length > 0
					? filterArray.map(({ name, index }) => <li key={index}>{name}</li>)
					: null
				}
			</ul>
		</div>
	)
};

export default SearchResults;
