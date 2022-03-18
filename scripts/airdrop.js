// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const AirDrop = await hre.ethers.getContractFactory("AirDrop");
  const deployAirDrop = await AirDrop.deploy();

  await deployAirDrop.deployed();

  const tokenClaimer = await deployAirDrop.tokenClaimer([],10000,0);

  
  console.log(tokenClaimer);
  console.log("Contract deployed to:", deployAirDrop.address);

  console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(100000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: deployAirDrop.address,
    constructorArguments: [],
  });
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
