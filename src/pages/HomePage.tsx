import { useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';

import { contractGenerator } from '../utils/contractGenerator';
import { Loader } from '../components/Loader/Loader';
import { NFTItem } from '../components/NFTItem';
import { userSelector } from '../redux/slices/userSlice';

import { marketplaceAbi, marketplaceAddress, tokenAbi, tokenAddress, } from '../configuration';

import '../styles.css';

const HomePage: React.FC<{
	setShowModal(condition: boolean): void;
}> = ({setShowModal}) => {
	const tokenContract = contractGenerator(tokenAddress, tokenAbi);
	const marketplaceContract = contractGenerator(marketplaceAddress, marketplaceAbi);
	const userObj = useSelector(userSelector);

	const [latestID, setLatestID] = useState(0);
	const [URIs, setURIs] = useState<any>([]);
	const [IDs, setIDs] = useState<any>([]);
	const [loaded, setLoaded] = useState<boolean>(false);

	const getTotalIDs = async () => await marketplaceContract.getCurrentId();
	const getURI = async (id: number) => await tokenContract.idToUri(id);

	useEffect(() => {
		getTotalIDs().then((data: any) => setLatestID(data.toNumber()));
	}, [marketplaceContract, tokenContract, URIs]);

	useEffect(() => {
		for (let i = 1; i <= latestID; i++) {
			getURI(i).then((data: any) => {
				setURIs((oldArray: any) => [...oldArray, data]);
				setIDs((oldArray: any) => [...oldArray, i]);
			});
		}
	}, [latestID]);

	return (
		<div className="bg-slate-600 flex w-screen flex-column home-container flex-wrap justify-center " >
			<button
				onClick={() => {
					userObj.user.length !== 0 && setShowModal(true);
				}}
				className={'rounded-lg text-white bg-indigo-600 px-8 py-3 capitalize transition-all ease-in-out duration-300 hover:scale-105'
				}
			>
				CREATE
			</button>
			<div className="flex w-screen flex-column home-container flex-wrap items-start pl-5">
				{URIs.length > 0 || !loaded ? (
					URIs.map((uri: string, index: number) => (
						<NFTItem
							uri={uri}
							index={IDs[index]}
							key={index}
							user={userObj.user}
						/>
					))
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default HomePage;
