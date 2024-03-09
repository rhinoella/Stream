// SalariesAllocation.jsx
import React, { useState } from 'react';

const generateId = ((id) => () => ++id)(3);

const SalariesAllocation = ({ onSalaryChange }) => { // Renamed for clarity
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);

  const handleSalaryChange = (id, salary) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === id ? { ...employee, salary: Number(salary) } : employee
    );
    setEmployees(updatedEmployees);
    onSalaryChange(updatedEmployees);
  };

  const addEmployee = () => {
    const newId = generateId();
    setEmployees([...employees, { id: newId, name: `Employee${newId}`, salary: 0 }]);
  };

  const removeEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    onSalaryChange(updatedEmployees); // Pass the updated employees back to the parents
  };

  return (
    <div>
      <h3>Allocate salaries:</h3>
      {employees.map(employee => (
        <div key={employee.id}>
          {employee.name}
          <input
            type="text" // Changed to number to allow only numeric input
            min="0" // Added a minimum value of 0 to prevent negative salaries
            value={employee.salary}
            placeholder={0}
            onChange={(e) => handleSalaryChange(employee.id, e.target.value)}
          /> USD
          <button onClick={() => removeEmployee(employee.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addEmployee}>Add Employee</button>
      {/* Removed the Pay Salaries button */}
    </div>
  );
};

export default SalariesAllocation;
