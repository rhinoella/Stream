import React, { useState, useEffect } from 'react';
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'
import { BrowserProvider, Contract, formatEther, formatUnits, ethers } from 'ethers'
import BalanceDisplay from './BalanceDisplay';
import SalariesAllocation from './SalariesAllocation';

const FLARE_RPC = "https://flare-api.flare.network/ext/bc/C/rpc";

const collateraliseABI = [
  'function registerLedger() public',
  'function collateraliseAssets(uint256 _bindingFactor) public payable',
  'function allocateFunds(address _to, uint256 _amount, uint256 _bindingFactor) public'
]

const CompanyPage = ({handleEmployeesChanged}) => {
  const [currency, setCurrency] = useState("ETH");
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

  const bindingFactor = 15;

  const currencies = {
    1: "ETH",
    11155111: "SepoliaETH",
    114 : "C2FLR",
    128123: "XTZ",
  }

  const contracts = {
    11155111: "0xd69ccf7056421e46e76cdb9e6073620c07fb2df2",
    114 : "0x2296768e004acf7e77ba2f9f33077c33ff3572e7",
    128123: "0xd1d98d4056f9bef513e3665e9a7e936cb42cfd34",
  }


  async function callAllocate() {
    const MyContract = await ethers.getContractFactory("Collateralise");
    const contract = MyContract.attach(
      // The deployed contract address
      "0xD1D98d4056f9bef513e3665E9A7E936Cb42cFD34"
    );
  
    await contract.DoSomething();
  }

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
          await ftsoRegistry["getCurrentPriceWithDecimals(string)"](currency);

      setEthPrice(Number(await _price));
    }

    fetchEthPrice();

  }, [walletProvider, isConnected]);

  useEffect(() => {
    setCurrency(currencies[chainId]);
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
    handleEmployeesChanged(employees);
  };

  const register = async () => {
    if (!isConnected) throw Error('User disconnected')

    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const Collateralise = new Contract(contracts[chainId], collateraliseABI, signer)
    await Collateralise.registerLedger();
  };

  const paySalaries = async () => {
    if (!isConnected) throw Error('User disconnected')

    const ethersProvider = new BrowserProvider(walletProvider)
    const signer = await ethersProvider.getSigner()
    // The Contract object
    const Collateralise = new Contract(contracts[chainId], collateraliseABI, signer)
    const options = { value: ethers.utils.parseEther(totalDue) };
    const transaction =  await Collateralise.collateraliseAssets(bindingFactor, options);
    transaction.wait();
  }

  return (
    <>
      <button onClick={register}>Register</button>
      <BalanceDisplay totalUSDBalance={totalUSDBalance} totalETHBalance={totalETHBalance} currentBalance={currentBalance} ethPrice={ethPrice} currency={currency} />
      <div>Your binding factor: {bindingFactor}</div>
      <SalariesAllocation
        employees={employees}
        onSalaryChange={handleAllocateSalary}
      />
      <div className="spending-summary">
        <div className="spent">
          Due: {totalSpent.toFixed(2)} USD / {totalDue} {currency}
          {/* Calculate and display the equivalent in Ether */}
        </div>
        <button className="pay-salaries-btn">
          Pay Salaries
        </button>
      </div>
    </>
  );
};

export default CompanyPage;
