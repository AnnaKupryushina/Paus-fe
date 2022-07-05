export const paths = {
	Home: '/',
	Login: '/login',
};

export const METAMASK_EXTENSION_LINK = 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en';

export const marketplaceAddress = '0x56302121577e5a6A46b49c813Cd8A9685a01Dc80';
export const tokenAddress = '0xc30E3D0Ddc1A7DAC85ae5a1e3BedE8B376eb8cA9';

// eslint-disable-next-line global-require
export const marketplaceAbi = require('./abi/marketplace.json');
// eslint-disable-next-line global-require
export const tokenAbi = require('./abi/pausToken.json');

export const BACKEND_URL = 'http://localhost:3001';
export const LOCAL_IPFS_NODE_URL = 'http://localhost:8080/ipfs/';
