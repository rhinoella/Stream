// App.jsx
import React, { useState } from 'react';
import BalanceDisplay from './BalanceDisplay';
import SalariesAllocation from './SalariesAllocation';
import './App.css';

const App = () => {
  const [totalBalance, setTotalBalance] = useState(10000); // Example total balance
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);

  const handleSalaryChange = (updatedEmployees) => {
    setEmployees(updatedEmployees); // Update the employees state
    const totalSalaries = updatedEmployees.reduce((total, employee) => total + (employee.salary || 0), 0);
    setTotalBalance(prevTotalBalance => prevTotalBalance - totalSalaries); // Deduct salaries from total balance
  };

  const paySalaries = () => {
    // Here you could implement the logic to actually pay salaries, e.g., sending data to a backend API.
    const totalSalaries = employees.reduce((total, employee) => total + (employee.salary || 0), 0);
    
    if (totalSalaries > totalBalance) {
      alert("Insufficient funds to pay salaries.");
      return;
    }

    // If sufficient funds, pay salaries
    setTotalBalance(prevTotalBalance => prevTotalBalance - totalSalaries);
    
    // Reset each employee's salary to 0 after payment
    const resetSalaries = employees.map(employee => ({ ...employee, salary: 0 }));
    setEmployees(resetSalaries);

    alert('Salaries paid!');
  };

  const currentBalance = totalBalance - employees.reduce((sum, { salary }) => sum + salary, 0);

  return (
    <div className="App">
      <BalanceDisplay totalBalance={totalBalance} currentBalance={currentBalance} />
      <SalariesAllocation 
        employees={employees}
        onSalaryChange={handleSalaryChange}
        onPaySalaries={paySalaries} 
      />
    </div>
  );
};

export default App;
