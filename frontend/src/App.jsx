// App.jsx
import React, { useState } from 'react';
import BalanceDisplay from './BalanceDisplay';
import SalariesAllocation from './SalariesAllocation';
import './App.css';

const App = () => {
  const [totalBalance, setTotalBalance] = useState(10000); // Example total balance
  // We don't need to deduct from totalBalance on salary change, so we use another state to track the current balance
  const [currentBalance, setCurrentBalance] = useState(10000); // Initialize current balance the same as total balance
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);

  // This function updates the salaries of employees whenever there's a change in the input fields
  const handleAllocateSalary = (updatedEmployees) => {
    setEmployees(updatedEmployees);
    // Calculate the total allocated salaries
    const totalSalaries = updatedEmployees.reduce((total, employee) => total + (employee.salary || 0), 0);
    // Update the current balance based on allocated salaries
    setCurrentBalance(totalBalance - totalSalaries);
  };

  // Function to process the payment of salaries
  const paySalaries = () => {
    const totalSalaries = employees.reduce((total, employee) => total + (employee.salary || 0), 0);
    if (totalSalaries <= totalBalance) {
      // If there are enough funds, deduct the total salaries from the total balance
      setTotalBalance(totalBalance - totalSalaries);
      // Reset the employee salaries after payment
      const resetEmployees = employees.map(employee => ({ ...employee, salary: 0 }));
      setEmployees(resetEmployees);
      // Reset the current balance to the new total balance
      setCurrentBalance(totalBalance - totalSalaries);
      alert('Salaries paid!');
    } else {
      alert('Not enough balance to pay salaries');
    }
  };

  return (
    <div className="App">
      <BalanceDisplay totalBalance={totalBalance} currentBalance={currentBalance} />
      <SalariesAllocation
        employees={employees}
        onAllocateSalary={handleAllocateSalary}
        onPaySalaries={paySalaries}
      />
    </div>
  );
};

export default App;
