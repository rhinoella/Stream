// BalanceDisplay.jsx
import React, { useEffect, useState } from 'react';

const FLARE_RPC = "https://flare-api.flare.network/ext/bc/C/rpc";

const usdToEtherRate = 0.00041; // This is a made-up rate for the example

const BalanceDisplay = ({ totalBalance, currentBalance }) => {
  const [ethPrice, setEthPrice] = useState(0);

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
  
      console.log(Number(_price));

      setEthPrice(Number(_price)/100000);
    }

    fetchEthPrice();

  }, []);

  const spent = totalBalance - currentBalance;

  return (
    <div>
      <h2>Total Balance: {totalBalance.toFixed(2)} USD</h2>
      <small>{ethPrice != 0 ? (totalBalance/ethPrice).toFixed(4) : '...'} Ether</small>
      <h2>Spent: {spent.toFixed(2)} USD - Remaining: {currentBalance.toFixed(2)} USD</h2>
      <small>Spent: { ethPrice != 0 ? (spent/ethPrice).toFixed(4) : '...'} Ether - Remaining: {ethPrice != 0 ? (currentBalance/ethPrice).toFixed(4) : '...'} Ether</small>
    </div>
  );
};

export default BalanceDisplay;
