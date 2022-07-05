import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

import { BACKEND_URL } from '../configuration';

import '../styles.css';

const PlayVideoPage: React.FC = () => {
	const location = useLocation();
	const data: any = location.state;

	return (
		<div className="flex flex-col w-screen justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-purple-500 main">
			<ReactPlayer
				url={`${BACKEND_URL}/watch/${data.key.Key}`}
				playing
				controls
			/>
		</div>
	);
};

export default PlayVideoPage;
