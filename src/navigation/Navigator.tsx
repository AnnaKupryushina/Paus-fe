import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { paths } from '../configuration';
import PlayVideoPage from '../pages/PlayVideoPage';
import { userSelector } from '../redux/slices/userSlice';

const Navigator: React.FC<{
  setWalletAddress(walletAddress: string): void;
  setShowModal(condition: boolean): void;
	walletAddress: string
}> = ({ setWalletAddress, setShowModal, walletAddress }) => {
	const [isEthereum, setIsEthereum] = useState<boolean>(false);
	const currentUser = useSelector(userSelector);

	useEffect(() => {
		if (window.ethereum) {
			setIsEthereum(true);
		} else {
			setIsEthereum(false);
		}
	}, []);

	useEffect(() => {
		if (walletAddress) {
			setWalletAddress(walletAddress);
		}
	}, [walletAddress]);

	return (
		<Routes>
			<Route
				path="/"
				element={
					currentUser.user.length === 0 ? (
						<Navigate replace to={paths.Login} />
					) : (
						<HomePage setShowModal={setShowModal}/>
					)
				}
			/>
			<Route
				path="/login"
				element={
					isEthereum ? (
						<LoginPage walletAddress={walletAddress} />
					) : (
						<ErrorPage errorTitle="You need to get Metamask extension" />
					)
				}
			/>
			<Route path="*" element={<ErrorPage />} />
			<Route
				path="/watch"
				element={
					currentUser.user.length === 0 ? (
						<Navigate replace to={paths.Login} />
					) : (
						<PlayVideoPage />
					)
				}
			/>
		</Routes>
	);
};

export default Navigator;
