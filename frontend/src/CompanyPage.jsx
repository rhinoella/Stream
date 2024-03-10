import React, { useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatEther, formatUnits, parseEther } from 'ethers'
import BalanceDisplay from './BalanceDisplay';
import SalariesAllocation from './SalariesAllocation';

const FLARE_RPC = "https://flare-api.flare.network/ext/bc/C/rpc";

const collateraliseContract = '0x617f3112bf5397D0467D315cC709EF968D9ba546'
const collateraliseABI = [
  'modifier onlyRegistered()',
  'function registerLedger() public',
  'function collateraliseAssets(uint256 _bindingFactor) public payable onlyRegistered()',
  'function allocateFunds(address _to, uint256 _amount, uint256 _bindingFactor) public onlyRegistered()'
]

const CompanyPage = () => {
  const [totalUSDBalance, setTotalUSDBalance] = useState(0);
  const [totalETHBalance, setTotalETHBalance] = useState(0);
  const [currentBalance, setCurrentBalance] = useState(0);
  const [totalDue, setTotalDue] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0); // Track the total spent here
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);
  const [ethPrice, setEthPrice] = useState(0);
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  useEffect(() => {
    const fetchEthPrice = async () => {
      const ethers = await import("ethers");
      const flare = await import("@flarenetwork/flare-periphery-contract-artifacts");

      const provider = new ethers.JsonRpcProvider(FLARE_RPC);
  
      const flareContractRegistry = new ethers.Contract(
          "0xaD67FE66660Fb8dFE9d6b1b4240d8650e30F6019",
          flare.nameToAbi("FlareContractRegistry", "flare").data,
          provider);
  
      const ftsoRegistryAddr = await
          flareContractRegistry.getContractAddressByName("FtsoRegistry");
      const ftsoRegistry = new ethers.Contract(
          ftsoRegistryAddr,
          flare.nameToAbi("FtsoRegistry", "flare").data,
          provider);
  
      const [_price, _timestamp, _decimals] =
          await ftsoRegistry["getCurrentPriceWithDecimals(string)"]("ETH");

      setEthPrice(Number(await _price));
    }

    fetchEthPrice();

  }, [walletProvider, isConnected]);

  useEffect(() => {
    const getUserBalance = async () => {
      if (ethPrice && isConnected && walletProvider) {
        const ethersProvider = new BrowserProvider(walletProvider);
        const balance = await ethersProvider.getBalance(address);
        console.log(formatUnits(balance))
        console.log(ethPrice/100000)
        setTotalETHBalance(formatUnits(balance));
        setTotalUSDBalance((ethPrice/100000) * formatUnits(balance));
      }
    };

    if (ethPrice !== 0) {
      getUserBalance();
    }
  }, [ethPrice]);

  const handleAllocateSalary = (updatedEmployees) => {
    setEmployees(updatedEmployees);
    const totalSalaries = updatedEmployees.reduce((total, employee) => total + employee.salary, 0);
    setTotalSpent(totalSalaries);
    setTotalDue(parseFloat(totalSpent / ethPrice *100000).toFixed(4));
    setCurrentBalance(totalUSDBalance - totalSalaries);
  };

  const paySalaries = () => {

  };

  return (
    <>
      <BalanceDisplay totalUSDBalance={totalUSDBalance} totalETHBalance={totalETHBalance} currentBalance={currentBalance} ethPrice={ethPrice} />
      <SalariesAllocation
        employees={employees}
        onSalaryChange={handleAllocateSalary}
      />
      <div className="spending-summary">
        <div className="spent">
          Due: {totalSpent.toFixed(2)} USD / {totalDue} ETH
          {/* Calculate and display the equivalent in Ether */}
        </div>
        <button onClick={paySalaries} className="pay-salaries-btn">
          Pay Salaries
        </button>
      </div>
    </>
  );
};

export default CompanyPage;
