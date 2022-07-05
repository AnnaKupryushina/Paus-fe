import axios from 'axios';
import { Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import { contractGenerator } from '../utils/contractGenerator';
import logo from '../assets/logo.svg';
import { VideoPreview } from './VideoPreview';
import {LOCAL_IPFS_NODE_URL, marketplaceAbi, marketplaceAddress, tokenAbi, tokenAddress} from '../configuration';

export function NFTItem(props: any) {
	const navigate = useNavigate();
	const tokenContract = contractGenerator(tokenAddress, tokenAbi);
	const IPFS_URL = LOCAL_IPFS_NODE_URL;
	const marketplaceContract = contractGenerator(marketplaceAddress, marketplaceAbi,);

	const [metaData, setMetaData] = useState<any>(null);
	const [price, setPrice] = useState<any>(null);
	const [name, setName] = useState<any>(null);

	const { uri, index, user } = props;
	const id = index;
	const amount = 1;
	const data = '0x';
	const bought = async () => await tokenContract.balanceOf(user, id);

	const getPrice = async (id: number | string) => await marketplaceContract.idToNft(id);

	const getMetaData = async (uri: string) => {
		const response = await axios.get(`${IPFS_URL}${uri}`).then((res) => res.data);
		setMetaData(response);
		setName(JSON.parse(response.video).name);
	};

	useEffect(() => {
		getMetaData(uri);
		getPrice(id).then((data) => setPrice(data.price.toNumber()));
	}, [id]);

	const buyOrWatchHandler = async () => {
		try {
			const allowance = await bought();

			if (allowance.toNumber() === 0) {
				return await marketplaceContract.buy(id, amount, data, {
					value: price,
				});
			}

			navigate('/watch', { state: JSON.parse(metaData.video) });
		} catch(error) {
			alert('Unable to buy an NFT');
			console.error(error);
		}
	};

	const logoImg = metaData
		? `${IPFS_URL}/${metaData.image}`
		: logo;

	const preview = metaData && metaData.preview ? JSON.parse(metaData.preview).key : null;

	return (
		<div className="flex flex-col justify-start items-center px-20 py-10 bg-white rounded-xl my-5 mx-5 h-fit z-10 transition-all ease-in-out duration-300 shadow hover:shadow-2xl hover:shadow-slate-900">
			<span className="font-bold text-gray-500 italic px-20">
				{id}
			</span>

			<div className="flex flex-col w-full flex font-bold leading-relaxed justify-center items-center">
				<span className="mb-2 text-2xl font-bold text-indigo-500">
					{name || 'Unknown'}
				</span>

				{ preview ? <VideoPreview data={preview}/> : <img src={logoImg} alt="NFT" className="w-64 h-64 p-2" /> }

				<div className="flex flex-col w-full justify-between  mb-3">
					<div className="flex flex-row w-full justify-between  mb-3">
						<span className="font-bold text-black">
							Price
						</span>
						<span className="font-bold text-black">
							{price} WEI
						</span>
					</div>
				</div>
				<Button
					className="rounded-lg bg-indigo-600 capitalize transition-all ease-in-out duration-300 hover:scale-105"
					onClick={buyOrWatchHandler}
				>
					Buy / Watch
				</Button>
			</div>
		</div>
	);
}
