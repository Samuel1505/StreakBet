import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-verify";

import "dotenv/config";

const { ALCHEMY_SEPOLIA_API_KEY_URL, ACCOUNT_PRIVATE_KEY, ETHERSCAN_API_KEY } =
  process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      viaIR: true,
      debug: {
        revertStrings: "strip",
      },
    },
  },
  networks: {
    sepolia: {
      url:
        ALCHEMY_SEPOLIA_API_KEY_URL || "https://sepolia.infura.io/v3/YOUR_KEY",
      accounts: ACCOUNT_PRIVATE_KEY ? [`0x${ACCOUNT_PRIVATE_KEY}`] : [],
      chainId: 11155111,
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: ACCOUNT_PRIVATE_KEY ? [`0x${ACCOUNT_PRIVATE_KEY}`] : [],
      chainId: 84532,
    },
  },
  
 etherscan: {
  apiKey: ETHERSCAN_API_KEY, // single key now, not per network
  customChains: [
    {
      network: "baseSepolia",
      chainId: 84532,
      urls: {
        apiURL: "https://api-sepolia.basescan.org/api",
        browserURL: "https://sepolia.basescan.org",
      },
    },
  ],
},

};

export default config;
