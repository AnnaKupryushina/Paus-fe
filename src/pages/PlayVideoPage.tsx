import React from 'react';
import ReactPlayer from 'react-player';
import { useLocation } from 'react-router-dom';

import { BACKEND_URL } from '../configuration';
import {VideoPreview} from '../components/VideoPreview';

import '../styles.css';

const PlayVideoPage: React.FC = () => {
	const location = useLocation();
	const data: any = location.state;

	return (
		<div className="flex flex-col w-screen justify-center items-center p-2 bg-gradient-to-r from-sky-500 to-purple-500 main">
			{ data.isOwn ? <ReactPlayer
				url={`${BACKEND_URL}/watch/${data.video.key.Key}`}
				playing
				controls
			/> : <VideoPreview data={data.preview.key}></VideoPreview> }
		</div>
	);
};

export default PlayVideoPage;
