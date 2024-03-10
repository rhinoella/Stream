require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
      }
    ],
  },
  etherscan: {
    apiKey: "31YAEVQ8YBKY5R4P7DW7P42UCQJGVYK5MQ"
  },
  networks: {

    sepolia: {
      url: "https://eth-mainnet.g.alchemy.com/v2/ADGVBX8Ud4w2x8hevM2RauD55mJZXoiw",
      accounts: [`608a72b78d173c6bd8040f3951987b9666f201d04497301533a8778ed74f74bc`]
    },
    etherlinkTest: {
      url: "https://node.ghostnet.etherlink.com",
      accounts: [`0x608a72b78d173c6bd8040f3951987b9666f201d04497301533a8778ed74f74bc`],
    }
  }
};