// src/components/EmployeeList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "./EmployeeForm";

const API_BASE = "http://localhost:8080/api/users";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_BASE);
      setEmployees(res.data);
    } catch (err) {
      console.error("Error fetching employees", err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const saveEmployee = async (employee) => {
    try {
      if (employee.id) {
        // Update
        await axios.put(`${API_BASE}/${employee.id}`, employee);
      } else {
        // Create
        await axios.post(API_BASE, employee);
      }
      fetchEmployees();
      setEditingEmployee(null);
    } catch (err) {
      console.error("Error saving employee", err);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`${API_BASE}/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  return (
    <div>
      <h2>Employee Management</h2>
      <EmployeeForm onSave={saveEmployee} editingEmployee={editingEmployee} clearEdit={() => setEditingEmployee(null)} />

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Department</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button onClick={() => setEditingEmployee(emp)}>Edit</button>
                <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
