const { ethers } = require("hardhat");

async function main() {
    // Create a ContractFactory instance for the contract
    const Collateralise = await ethers.getContractFactory("Test");

    // Deploy the contract
    const collateralise = await Collateralise.deploy();

    // Wait for the contract to be deployed
    await collateralise.deployed();

    console.log("Contract Deployed to Address:", collateralise.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
