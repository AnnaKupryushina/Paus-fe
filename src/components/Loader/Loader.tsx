import React from 'react';

import './Loader.css';

export function Loader() {
	return (
		<div className="w-screen bg-black absolute z-30 top-0 left-0 opacity-60 loader">
			<svg className="spinner" viewBox="0 0 50 50">
				<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"/>
			</svg>
		</div>
	);
}
