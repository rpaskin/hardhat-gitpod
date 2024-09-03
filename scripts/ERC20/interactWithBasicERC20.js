// This script returns the token balance for the ERC20 contract deployer
// Using the Alchemy SDK and Ethers.js

const { Alchemy, Network } = require("alchemy-sdk");
const { ethers } = require("hardhat");
require('dotenv').config();


const config = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);

const main = async () => {

    const accounts = await ethers.getSigners();

    // The contract address deployed on the network as set in .env BASICERC20_CONTRACT_ADDRESS
    const contractAddress = `0x${process.env.BASICERC20_CONTRACT_ADDRESS}`;
    console.log(`contract addr: ${contractAddress}`);
    const numDecimals = 18;

    // Import the ABI from the artifacts directory
    // const contractABI = require("../../artifacts/contracts/ERC20/BasicERC20.sol/RexToken.json").abi;

    // console.log(JSON.stringify(contractABI));

    // Get the token name from the contract
    // let tokenName = await alchemy.core.getCode(contractAddress);
    let tokenMetadata = await alchemy.core.getTokenMetadata(contractAddress);
    // console.log(`token Metadata: ${JSON.stringify(tokenMetadata)}`);
    console.log(`token name: ${tokenMetadata.name}`);
    console.log(`token symbol: ${tokenMetadata.symbol}`);

    // Get latest token balance for the deployer's wallet

    // Wallet address
    const walletAddress = accounts[0].address.toString();
    console.log(`wallet addr: ${walletAddress}`);

    let balance = await alchemy.core.getTokenBalances(walletAddress, [contractAddress])
    balance = balance['tokenBalances'][0]['tokenBalance'];
    balance = (parseInt(balance) / 10 ** numDecimals).toFixed(2);
    console.log("Balance:", balance, tokenMetadata.symbol);
    
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();