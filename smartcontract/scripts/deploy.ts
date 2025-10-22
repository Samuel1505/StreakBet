import { ethers } from "hardhat";

async function main() {
  const PrizePoolPrediction = await ethers.getContractFactory("PrizePoolPrediction");
  const prizePoolPrediction = await PrizePoolPrediction.deploy(); 
  
  await prizePoolPrediction.waitForDeployment();
  
  console.log(`PrizePoolPrediction contract deployed to: ${prizePoolPrediction.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});