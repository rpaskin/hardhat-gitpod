const { ethers } = require("hardhat");

// Define the contract name in the global scope
const contractName = "RedeSocialNotarizada";

async function main() { 
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const precoInicial = 1234;

    // The contract to deploy
    const RSN = await ethers.getContractFactory(contractName); 
    const rsn = await RSN.deploy(precoInicial);

    await rsn.waitForDeployment();

    // No need to call .deployed() here, as rsn is already the deployed contract instance
    console.log("RedeSocialNotarizada deployed to:", rsn.target); 
} 

main().then(() => process.exit(0)).catch((error) => {
    console.error(error);
    process.exit(1);
});
