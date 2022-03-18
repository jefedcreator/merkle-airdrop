/* global task ethers */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("hardhat-contract-sizer");
require("dotenv-safe").config();
require("solidity-coverage");
require("@nomiclabs/hardhat-etherscan");
//require('./tasks/generateDiamondABI.js')

// This is a sample Buidler task. To learn how to create your own go to
// https://buidler.dev/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.getAddress());
  }
});

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more
module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: process.env.MATIC_URL,
        // blockNumber: 16712208,
        timeout: 1200000,
      },
    },
    localhost: {
      timeout: 1600000,
    },

    // matic: {
    //   url: process.env.MATIC_URL,
    //   // url: 'https://rpc-mainnet.maticvigil.com/',
    //   accounts: [process.env.SECRET],
    //   //   // blockGasLimit: 20000000,
    //   //   blockGasLimit: 20000000,
    //   gasPrice: 1000000000,
    //   // timeout: 90000
    // },
    // mumbai: {
    //   url: 'https://rpc-mumbai.matic.today',
    //   accounts: [process.env.SECRET],
    //   blockGasLimit: 20000000,
    //   gasPrice: 1000000000
    // },
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [process.env.SECRET],
      gas: 2100000,
      gasPrice: 8000000000,
  },
    // kovan: {
    //   url: process.env.KOVAN_URL,
    //   accounts: [process.env.SECRET],
    //   gasPrice: 5000000000,
    //   timeout: 200000000,
    // },
    // ethereum: {
    //   url: process.env.MAINNET_URL,
    //   accounts: [process.env.SECRET],
    //   blockGasLimit: 20000000,
    //   gasPrice: 2100000000
    // }
  },
  gasReporter: {
    currency: "USD",
    gasPrice: 100,
    enabled: false,
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: false,
    disambiguatePaths: true,
  },
  etherscan: {
    apiKey: {
      ropsten: process.env.ETHERSCAN_KEY,
    }
  },
  // This is a sample solc configuration that specifies which version of solc to use
  solidity: {
    version: "0.8.1",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
