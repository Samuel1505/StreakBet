import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const { ALCHEMY_SEPOLIA_API_KEY_URL, ACCOUNT_PRIVATE_KEY, ETHERSCAN_API_KEY } =
  process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200, // Low runs value to prioritize smaller bytecode
      },
      viaIR: true,
      debug: {
        revertStrings: "strip", // Remove revert strings to reduce bytecode size
      },
    },
  },
  networks: {
    sepolia: {
      url:
        ALCHEMY_SEPOLIA_API_KEY_URL || "https://sepolia.infura.io/v3/YOUR_KEY",
      accounts: ACCOUNT_PRIVATE_KEY ? [`0x${ACCOUNT_PRIVATE_KEY}`] : [],
    },
    baseSepolia: {
      url: "https://sepolia.base.org",
      accounts: ACCOUNT_PRIVATE_KEY ? [`0x${ACCOUNT_PRIVATE_KEY}`] : [],
      chainId: 84532,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY || "",
      baseSepolia: ETHERSCAN_API_KEY || "",
    },
  },
};

export default config;