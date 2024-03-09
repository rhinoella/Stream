// App.jsx
import React, { useState } from 'react';
import BalanceDisplay from './BalanceDisplay';
import SalariesAllocation from './SalariesAllocation';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(10000); // Example balance

  const paySalaries = (employees) => {
    // Calculate the total of salaries to be paid.
    const totalSalaries = employees.reduce((total, employee) => total + employee.salary, 0);

    if (totalSalaries > balance) {
      alert('Insufficient funds to pay salaries.');
      return;
    }

    // Subtract the total salaries from the balance.
    setBalance(currentBalance => currentBalance - totalSalaries);
  };

  return (
    <div className="App">
      <BalanceDisplay balance={balance} />
      <SalariesAllocation onPaySalaries={paySalaries} />
    </div>
  );
};

export default App;
