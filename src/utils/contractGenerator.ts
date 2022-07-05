import { ethers } from 'ethers';

export const contractGenerator = (address: string, abi: ethers.ContractInterface): ethers.Contract => {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const contract = new ethers.Contract(address, abi, signer);

	return contract;
};
