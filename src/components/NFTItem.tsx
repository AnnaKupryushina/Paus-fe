import axios from 'axios';
import {Button} from '@material-tailwind/react';
import {useNavigate} from 'react-router-dom';
import React, {useEffect, useState} from 'react';

import {contractGenerator} from '../utils/contractGenerator';
import logo from '../assets/logo.svg';
import {LOCAL_IPFS_NODE_URL, marketplaceAbi, marketplaceAddress, tokenAbi, tokenAddress} from '../configuration';

export function NFTItem(props: any) {
	const navigate = useNavigate();
	const tokenContract = contractGenerator(tokenAddress, tokenAbi);
	const IPFS_URL = LOCAL_IPFS_NODE_URL;
	const marketplaceContract = contractGenerator(marketplaceAddress, marketplaceAbi,);

	const [metaData, setMetaData] = useState<any>(null);
	const [price, setPrice] = useState<any>(null);
	const [name, setName] = useState<any>(null);
	const [isOwn, setIsOwn] = useState<boolean>(false);

	const {uri, index, user} = props;
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
		bought().then((result) => setIsOwn(result.toNumber() === 1));
		getMetaData(uri);
		getPrice(id).then((data) => setPrice(data.price.toNumber()));
	}, [id]);

	const buyHandler = async () => {
		try {
			if (!isOwn) {
				await marketplaceContract.buy(id, amount, data, {
					value: price,
				});
			}
		} catch (error) {
			alert('Unable to buy an NFT');
			console.error(error);
		}
	};

	const watchHandler = async () => {
		const preview = JSON.parse(metaData.preview);

		let state: { state: { isOwn: boolean, preview?: Object, video?: Object } } = {state: {isOwn, preview}};

		if (isOwn) {
			const video = JSON.parse(metaData.video);

			state = {state: {isOwn, video}};
		}

		navigate('/watch', state);
	};

	const logoImg = metaData
		? `${IPFS_URL}/${metaData.image}`
		: logo;

	return (
		<div
			className="flex flex-col justify-start items-center px-20 py-10 bg-white rounded-xl my-5 mx-5 h-fit z-10 transition-all ease-in-out duration-300 shadow hover:shadow-2xl hover:shadow-slate-900">
			<span className="font-bold text-gray-500 italic px-20">
				{id}
			</span>

			<div className="flex flex-col w-full flex font-bold leading-relaxed justify-center items-center">
				<span className="mb-2 text-2xl font-bold text-indigo-500">
					{name || 'Unknown'}
				</span>

				<img src={logoImg} alt="NFT" className="w-64 h-64 p-2"/>

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
				<div className="flex flex-row w-full justify-center  mb-3">
					{ !isOwn ? <Button
						className="rounded-lg bg-indigo-600 capitalize transition-all ease-in-out duration-300 hover:scale-105 mx-1 w-full"
						onClick={buyHandler}
					>
						Buy
					</Button> : null }

					<Button
						className="rounded-lg bg-indigo-600 capitalize transition-all ease-in-out duration-300 hover:scale-105 mx-1 w-full"
						onClick={watchHandler}
					>
						Watch
					</Button>
				</div>
			</div>
		</div>
	);
}
