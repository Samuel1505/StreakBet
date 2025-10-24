import { ethers, run } from "hardhat";

async function main() {
  const PrizePoolPrediction = await ethers.getContractFactory("PrizePoolPrediction");
  const prizePoolPrediction = await PrizePoolPrediction.deploy(); 
  
  await prizePoolPrediction.waitForDeployment();
  
  const contractAddress = prizePoolPrediction.target;
  console.log(`PrizePoolPrediction contract deployed to: ${contractAddress}`);
  
  // Wait for a few block confirmations before verifying
  console.log("Waiting for block confirmations...");
  await prizePoolPrediction.deploymentTransaction()?.wait(5);
  
  // Verify the contract
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: [], // Add constructor args here if your contract has any
    });
    console.log("Contract verified successfully!");
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Contract is already verified!");
    } else {
      console.error("Verification failed:", error);
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});