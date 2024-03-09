// SalariesAllocation.jsx
import React, { useState } from 'react';

// Utility function to generate a unique ID for each new employee
const generateId = ((id) => () => ++id)(3);

const SalariesAllocation = ({ onPaySalaries }) => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);

  const handleSalaryChange = (id, salary) => {
    setEmployees(employees.map(employee =>
      employee.id === id ? { ...employee, salary: parseFloat(salary) || 0 } : employee
    ));
  };

  const addEmployee = () => {
    const newId = generateId();
    setEmployees([...employees, { id: newId, name: `Employee${newId}`, salary: 0 }]);
  };

  const removeEmployee = (id) => {
    setEmployees(employees.filter(employee => employee.id !== id));
  };

  return (
    <div>
      <h3>Allocate salaries:</h3>
      {employees.length === 0 ? (
        <p>Please add at least one employee.</p>
      ) : (
        employees.map(employee => (
          <div key={employee.id}>
            {employee.name}{' '}
            <input
              type="number"
              value={employee.salary}
              onChange={(e) => handleSalaryChange(employee.id, e.target.value)}
            />
            <button onClick={() => removeEmployee(employee.id)}>Remove</button>
          </div>
        ))
      )}
      <button onClick={addEmployee}>Add Employee</button>
      <button onClick={() => onPaySalaries(employees)}>Pay Salaries</button>
    </div>
  );
};

export default SalariesAllocation;
