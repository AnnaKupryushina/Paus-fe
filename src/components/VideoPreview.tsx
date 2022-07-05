import React from 'react';

import {BACKEND_URL} from '../configuration';

export const VideoPreview: React.FC<{
	data: { Key: string }
}> = ({data}) => {
	return <img src={`${BACKEND_URL}/watch/${data.Key}`} alt="Preview" />;
};
