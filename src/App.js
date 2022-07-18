import React, { useEffect, useReducer } from 'react';
import './App.css';

import FilterTransition from './components/FilterTransition';
import FilterDeferred from './components/FilterDeferred';



const initialState = {
	loading: true,
	error: false,
	count: 0,
	data: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'loading': {
			return { ...state, loading: action.payload };
		}
		case 'success': {
			return {
				...state,
				error: false,
				count: action.payload.count,
				data: [...state.data, ...action.payload.results],
			};
		}
		case 'error': {
			return { ...state, loading: false, error: true };
		}
		default: return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	const loadNames = async (page = 'https://swapi.dev/api/people?page=1') => {
		try {
			const res = await fetch(page);
			const jsonRes = await res.json();
			dispatch({ type: 'success', payload: jsonRes });
			if (jsonRes.next) {
				return loadNames(jsonRes.next);
			}
			dispatch({ type: 'loading', payload: false });
		} catch (err) {
			dispatch({ type: 'error' });
		}
	};

	useEffect(() => {
		dispatch({ type: 'loading', payload: true });
		loadNames();
	}, []);

	return (state.loading
		? <span>Loading... ({state.data.length} of {state.count})</span>
		: (
			<div>
				<h1>Additional React Hooks: useReducer, useMemo, useTransition, useDeferredValue </h1>
				{state.error && <div>Error..</div>}
				<div className='flex'>
					<div className='cont'><FilterDeferred data={state.data} /></div>
					<div className='cont'><FilterTransition data={state.data} /></div>
				</div>
			</div>
		)
	);
};

export default App;
