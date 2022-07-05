import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import React from 'react';

import logo from '../assets/logo.svg';
import { paths } from '../configuration';
import { setUser } from '../redux/slices/userSlice';
import { store } from '../redux/store';

const Header: React.FC<{
  walletAddress: string;
  chainId: number | null;
  setWalletAddress(walletAddress: string): void;
}> = ({ walletAddress, chainId, setWalletAddress }) => {
	const requestAccount = async () => {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: 'eth_requestAccounts',
				});

				setWalletAddress(accounts[0]);
				store.dispatch(setUser(accounts[0]));
				setWalletAddress(accounts[0]);
			} catch (error) {
				console.error('Unable to connect', error);
			}
		}
	};

	const connectWallet = async () => {
		if (window.ethereum !== undefined) {
			await requestAccount();

			const provider = new ethers.providers.Web3Provider(window.ethereum);
		}
	};

	return (
		<nav className="relative flex flex-wrap bg-teal-400 items-center justify-between px-2 py-3">
			<div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
				<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
					<Link
						className="text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-black flex items-center hover:text-indigo-500  ease-in duration-150"
						to={paths.Home}
					>
						<img
							className="object-contain h-10 w-10 mr-2"
							src={logo}
							alt="logo-img"
						/>
						marketplace
					</Link>
				</div>
				{chainId !== 5 && (
					<h1 className="text-lg uppercase font-bold text-indigo-500 ml-44 z-50">
						You have to switch your network to Goerli
					</h1>
				)}
				<div
					className="lg:flex flex-grow items-center" id="example-navbar-danger">
					<ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
						<li className="nav-item flex items-center">
							{walletAddress ? (
								<h4 className="text-black font-sm " title={walletAddress}>
									Your wallet: {walletAddress}
								</h4>
							) : (
								<button
									onClick={connectWallet}
									className="px-3 py-2 flex items-center text-lg uppercase font-bold leading-snug text-black hover:text-indigo-500 hover:scale-110 ease-in duration-150"
								>
									Login
								</button>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;
