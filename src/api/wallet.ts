import { JsonRpcProvider, Wallet, HDNodeWallet, formatEther } from 'ethers';

let _provider: JsonRpcProvider;
let _wallet: Wallet;
export function initApi(networkUrl: string) {
  _provider = new JsonRpcProvider(networkUrl);
}

export const createWallet = (phrase: string = '') => {
  const hdWallet = phrase ? Wallet.fromPhrase(phrase) : Wallet.createRandom(_provider);

  _wallet = new Wallet(hdWallet.privateKey, _provider);
  return {
    wallet: getWallet(),
    phrase: hdWallet.mnemonic.phrase,
  };
};

export const loadWallet = (pk: string) => {
  _wallet = new Wallet(pk, _provider);
  return getWallet();
};

export const request = (method: string, params: unknown) => {
  return _provider.send(method, params);
};

export const getWallet = () => {
  if (!_wallet) {
    throw new Error('Wallet not initialized. You must load or create new wallet firts');
  }
  return _wallet;
};

export const getBalance = async (address: string = '') => {
  const balance = await _provider.getBalance(address || _wallet.address);
  return formatEther(balance);
};

export default {
  request,
  createWallet,
  loadWallet,
  getWallet,
  getBalance,
};
