// SalariesAllocation.jsx
import React, { useState } from 'react';

const generateId = ((id) => () => ++id)(3);

const SalariesAllocation = ({ onAllocateSalary }) => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Employee1', salary: 0 },
    { id: 2, name: 'Employee2', salary: 0 },
    { id: 3, name: 'Employee3', salary: 0 },
  ]);

  const handleSalaryChange = (id, salary) => {
    const updatedSalaries = employees.map(employee =>
      employee.id === id ? { ...employee, salary: parseFloat(salary) || 0 } : employee
    );
    setEmployees(updatedSalaries);
    onAllocateSalary(updatedSalaries); // Use the prop function name consistently
  };

  const addEmployee = () => {
    const newId = generateId();
    setEmployees([...employees, { id: newId, name: `Employee${newId}`, salary: 0 }]);
  };

  const removeEmployee = (id) => {
    const updatedEmployees = employees.filter(employee => employee.id !== id);
    setEmployees(updatedEmployees);
    onAllocateSalary(updatedEmployees); // Call with the updated employees array
  };

  return (
    <div>
      <h3>Allocate salaries:</h3>
      {employees.map(employee => (
        <div key={employee.id}>
          {employee.name}
          <input
            type="text"
            value={employee.salary}
            onChange={(e) => handleSalaryChange(employee.id, e.target.value)}
            placeholder={0}
          /> USD
          <button onClick={() => removeEmployee(employee.id)}>Remove</button>
        </div>
      ))}
      <button onClick={addEmployee}>Add Employee</button>
      <button onClick={() => onAllocateSalary(employees)}>Pay Salaries</button>
    </div>
  );
};

export default SalariesAllocation;
