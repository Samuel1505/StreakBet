import { ethers, run, network } from "hardhat";

async function main() {
  console.log(`Deploying to network: ${network.name}`);
  
  const PrizePoolPrediction = await ethers.getContractFactory("PrizePoolPrediction");
  
  console.log("Deploying PrizePoolPrediction contract...");
  const prizePoolPrediction = await PrizePoolPrediction.deploy(); 
  
  await prizePoolPrediction.waitForDeployment();
  
  const contractAddress = await prizePoolPrediction.getAddress();
  console.log(`PrizePoolPrediction contract deployed to: ${contractAddress}`);
  
  // Only verify on non-local networks
  if (network.name !== "hardhat" && network.name !== "localhost") {
    // Wait for block confirmations
    const confirmations = network.name === "mainnet" ? 6 : 5;
    console.log(`Waiting for ${confirmations} block confirmations...`);
    await prizePoolPrediction.deploymentTransaction()?.wait(confirmations);
    
    // Verify the contract
    console.log("Verifying contract on Etherscan...");
    try {
      await run("verify:verify", {
        address: contractAddress,
        constructorArguments: [],
      });
      console.log("Contract verified successfully!");
    } catch (error: any) {
      if (error.message.toLowerCase().includes("already verified")) {
        console.log("Contract is already verified!");
      } else {
        console.error("Verification failed:", error);
      }
    }
  } else {
    console.log("Skipping verification on local network");
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});