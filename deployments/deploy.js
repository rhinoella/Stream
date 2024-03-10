async function main() {
    const Collateralise = await ethers.getContractFactory("Collateralise");
    const collateralise = await Collateralise.deploy();
    console.log("Contract Deployed to Address:", collateralise.address);
  }
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  