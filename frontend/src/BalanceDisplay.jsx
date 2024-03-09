// BalanceDisplay.jsx
import React from 'react';

const usdToEtherRate = 0.00041; // This is a made-up rate for the example

const BalanceDisplay = ({ totalBalance, currentBalance }) => {
  const spent = totalBalance - currentBalance;
  const totalInEther = totalBalance * usdToEtherRate;
  const spentInEther = spent * usdToEtherRate;
  const remainingInEther = currentBalance * usdToEtherRate;

  return (
    <div>
      <h2>Total Balance: {totalBalance.toFixed(2)} USD</h2>
      <small>{totalInEther.toFixed(2)} Ether</small>
      <h2>Spent: {spent.toFixed(2)} USD - Remaining: {currentBalance.toFixed(2)} USD</h2>
      <small>Spent: {spentInEther.toFixed(2)} Ether - Remaining: {remainingInEther.toFixed(2)} Ether</small>
    </div>
  );
};

export default BalanceDisplay;
