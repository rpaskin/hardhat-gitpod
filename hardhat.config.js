require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require('dotenv').config();


task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// const alchemy_url = "https://eth-sepolia.g.alchemy.com/v2/...";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
    },
    // sepolia: {
    //   url: process.env.ALCHEMY_API_URL,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    //   chainId: 11155111,
    // },
    // mumbai: {
    //   url: process.env.ALCHEMY_API_URL,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`],
    //   // chainId: 80001, // Mumbai Testnet chain ID
    //   chainId: 80002, // Amoy testnet
    // }
  }
};
