import React, { useEffect, useState } from 'react';

import './App.css';
import { getChainId } from './utils/utils';
import Header from './components/Header';
import { Modal } from './components/Modal';
import Navigator from './navigation/Navigator';

export default function App() {
	const [walletAddress, setWalletAddress] = useState<string>('');
	const [showModal, setShowModal] = useState<boolean>(false);
	const [chainId, setChainId] = useState<number | null>(null);

	useEffect(() => {
		getChainId().then((cid) => setChainId(cid));
	}, []);

	return (
		<>
			{showModal ? (
				<Modal
					setShowModal={setShowModal}
				/>
			) : null}
			<Header
				chainId={chainId}
				walletAddress={walletAddress}
				setWalletAddress={setWalletAddress}
			/>
			<Navigator walletAddress={walletAddress} setWalletAddress={setWalletAddress} setShowModal={setShowModal} />
		</>
	);
}
