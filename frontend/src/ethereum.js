import { ethers, Contract } from "ethers";
import Web3 from "web3";
import Contracts from "./Contracs.json";
import ERC20Abi from "./ERC20Abi.json"

const getBlockchain = () => 
    new Promise((resolve, reject) => {
        window.addEventListener("load", async () => {
            if(window.ethereum) {
                await window.ethereum.enable();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const signerAddress = await signer.getAddress();
                const dex = new Contract(
                    Contracts.addressDex,
                    Contracts.abiDex,
                    signer
                    );
                const tokens = await dex.getTokens();
                const tokenContracts = tokens.reduce((acc, token) => ({
                    ...acc,
                    [Web3.utils.hexToUtf8(token.ticker)]: new Contract(
                        token.tokenAddress,
                        ERC20Abi,
                        signer
                    )
                }), {})
                resolve({
                    signer,
                    signerAddress, 
                    dex, 
                    ...tokenContracts
                });
            }
            resolve({
                signerAddress: undefined, 
                dex: undefined, 
                bat: undefined, 
                dai: undefined,
                rep: undefined,
                zrx: undefined
            })
        })
    })

export default getBlockchain;