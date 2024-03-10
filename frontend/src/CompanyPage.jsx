import React, { useState } from 'react';
import BalanceDisplay from './BalanceDisplay';
import SalariesAllocation from './SalariesAllocation';

const CompanyPage = () => {
  const [totalBalance, setTotalBalance] = useState(10000);
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [totalSpent, setTotalSpent] = useState(0); // Track the total spent here
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);

  const handleAllocateSalary = (updatedEmployees) => {
    setEmployees(updatedEmployees);
    const totalSalaries = updatedEmployees.reduce((total, employee) => total + employee.salary, 0);
    setTotalSpent(totalSalaries);
    setCurrentBalance(totalBalance - totalSalaries);
  };

  const paySalaries = () => {
    const totalSalaries = employees.reduce((total, employee) => total + (employee.salary || 0), 0);
    if (totalSalaries <= currentBalance) {
      setTotalBalance(prev => prev - totalSalaries); // Deduct salaries from the total balance
      setTotalSpent(prev => prev + totalSalaries); // Add salaries to the total spent
      setCurrentBalance(prev => prev - totalSalaries); // Update current balance
      const resetEmployees = employees.map(employee => ({ ...employee, salary: 0 }));
      setEmployees(resetEmployees);
      alert('Salaries paid!');
    } else {
      alert('Not enough balance to pay salaries');
    }
  };

  return (
    <>
      <BalanceDisplay totalBalance={totalBalance} currentBalance={currentBalance} />
      <SalariesAllocation
        employees={employees}
        onAllocateSalary={handleAllocateSalary}
      />
      <div className="spending-summary">
        <div className="spent">
          Spent: {totalSpent.toFixed(2)} USD
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
