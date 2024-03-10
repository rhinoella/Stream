const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { Signer } = require("ethers");

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

describe("Collateralise", () => {
  const ONE_ETH = ethers.parseEther("1");
  const TWO_ETH = ethers.parseEther("1");

    const deployContractFixture = async () => {
      const [bank] = await ethers.getSigners();
      // Deploying Collateralise Contract
      const Collateralise = await ethers.deployContract("Collateralise");
      await Collateralise.waitForDeployment();
  
      // skip first return value as it is the same as bank
      const [, company, employee] = await ethers.getSigners(); // keypair (emulates users)
    
      await Collateralise.connect(company).registerLedger();

      const bindingFactor = getRandomInt(500);
      await Collateralise.connect(company).collateraliseAssets(
        bindingFactor, { value: TWO_ETH }
      );
  
      return { bank, company, employee, Collateralise, bindingFactor };
    };

    describe("Deployment", () => {
      it("Sets bank owner upon constructor", async () => {
        const { bank, Collateralise } = await loadFixture(
          deployContractFixture
        );
  
        expect(await Collateralise.owner()).to.equal(bank.address);
      });

      it("Holds collateralised ETH", async () => {
        const { bank, company, Collateralise } = await loadFixture(
          deployContractFixture
        );
        expect(await Collateralise.isCompanyRegistered(company.address)).to.be.true;
        expect(await ethers.provider.getBalance(Collateralise.target)).to.equal(TWO_ETH);
      });

      it("Stores correct committed balance", async () => {
        const { company, Collateralise, bindingFactor } = await loadFixture(
          deployContractFixture
        );
          const [ x, y ] = await Collateralise.commit(bindingFactor, TWO_ETH);
          const ledger = await Collateralise.companyLedgers(company.address)
          expect(ledger.totalBalanceCommit.x).to.equal(x);
          expect(ledger.totalBalanceCommit.y).to.equal(y);
          expect(await Collateralise.verify(bindingFactor, TWO_ETH, x, y)).to.be.true;
      });

      it("Allocates funds", async () => {
        const { company, employee, Collateralise, bindingFactor } = await loadFixture(
          deployContractFixture
        );
        const employeeBindingFactor = getRandomInt(8000);
        const ledgerBeforeAlloc = await Collateralise.companyLedgers(company.address);
        await Collateralise.connect(company).allocateFunds(employee, ONE_ETH, employeeBindingFactor);
        const ledgerAfterAlloc = await Collateralise.companyLedgers(company.address);

        const [ xAlloc, yAlloc ] = await Collateralise.commit(employeeBindingFactor, ONE_ETH);
        expect(await Collateralise.verify(employeeBindingFactor, ONE_ETH, xAlloc, yAlloc)).to.be.true;

        const [ xRemaining, yRemaining ] = await Collateralise.eSub(
          ledgerBeforeAlloc.totalBalanceCommit.x, ledgerBeforeAlloc.totalBalanceCommit.y, xAlloc, yAlloc
        );
        
        expect(await ledgerAfterAlloc.totalRevenue.x).to.equal(xRemaining);
        expect(await ledgerAfterAlloc.totalRevenue.y).to.equal(yRemaining);

        const [ xTot, yTot ] = await Collateralise.eAdd(xAlloc, yAlloc, xRemaining, yRemaining);

        expect(await Collateralise.verify(bindingFactor, TWO_ETH, xTot, yTot)).to.be.true;

        const employeeAllocation = await Collateralise.allocations(employee.address);

        expect(await employeeAllocation.x).to.equal(xAlloc);
        expect(await employeeAllocation.y).to.equal(yAlloc);
      });
    });
});