import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { paths } from '../configuration';

import '../styles.css';

const LoginPage: React.FC<{
	walletAddress: string
}> = ({walletAddress}) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (walletAddress) {
			navigate(paths.Home);
		}
	}, [walletAddress]);

	return (
		<div className="flex flex-col w-screen justify-center items-center p-2 bg-slate-600 main">
			<h1 className="text-white">You are unauthorized. Please, use MetaMask to login. Hit the Login button on the header</h1>
		</div>
	);
};

export default LoginPage;
