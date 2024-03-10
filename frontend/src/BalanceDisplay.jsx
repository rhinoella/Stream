const BalanceDisplay = ({ totalUSDBalance, totalETHBalance, currentBalance, ethPrice }) => {
  totalETHBalance = parseFloat(totalETHBalance)
return (
    <div>
      <h2>Total Balance: {totalUSDBalance.toFixed(2)} USD</h2>
      <small>{ethPrice !== 0 ? totalETHBalance.toFixed(4) : '...'} Ether</small>
      <h2>Remaining: {currentBalance.toFixed(2)} USD</h2>
      <small>Remaining: {ethPrice !== 0 ? (currentBalance / ethPrice *10000).toFixed(4) : '...'} Ether</small>
    </div>
  );
};

export default BalanceDisplay;
