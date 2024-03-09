import React, { useState, useEffect } from 'react';

// This is a dummy function to simulate fetching transactions from a blockchain
const fetchTransactions = async () => {
  // This would be replaced by actual API calls to get transaction data
  return [
    { id: 1, timestamp: new Date().toLocaleString(), payments: [{ employee: 'Employee1', amountUSD: 1000 }, { employee: 'Employee2', amountUSD: 1500 }] },
    // More transactions...
  ];
};

const BankPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [ethRate, setEthRate] = useState(0.00041); // Replace this with your rate-fetching logic

  useEffect(() => {
    const loadTransactions = async () => {
      const fetchedTransactions = await fetchTransactions();
      setTransactions(fetchedTransactions);
    };
    
    loadTransactions();
  }, []);

  // Calculate the total balance from all transactions
  const totalBalanceUSD = transactions.reduce((total, t) => total + t.payments.reduce((sum, { amountUSD }) => sum + amountUSD, 0), 0);
  
  return (
    <div className="bank-page-container">
      <div className="total-balance">
        <h2>Total Balance: {totalBalanceUSD.toFixed(2)} USD</h2>
        <small>{(totalBalanceUSD * ethRate).toFixed(4)} Ether</small>
      </div>

      <div className="transactions">
        <h3>Transactions:</h3>
        {transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            <h4>Transaction #{transaction.id} [Date: {transaction.timestamp}]</h4>
            {transaction.payments.map((payment, index) => (
              <div key={index} className="transaction-details">
                <p>{payment.employee}: {payment.amountUSD.toFixed(2)} USD</p>
                <small>{(payment.amountUSD * ethRate).toFixed(4)} Ether</small>
              </div>
            ))}
            <hr className="transaction-separator" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BankPage;
