// src/components/EmployeeForm.jsx
import React, { useState, useEffect } from "react";

const EmployeeForm = ({ onSave, editingEmployee, clearEdit }) => {
  const [employee, setEmployee] = useState({ id: null, name: "", email: "", department: "" });

  useEffect(() => {
    if (editingEmployee) {
      setEmployee(editingEmployee); // sets id, name, email, department
    } else {
      setEmployee({ id: null, name: "", email: "", department: "" });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(employee);
    setEmployee({ id: null, name: "", email: "", department: "" });
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={employee.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={employee.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="department"
        placeholder="Department"
        value={employee.department}
        onChange={handleChange}
        required
      />
      <button type="submit">{editingEmployee ? "Update" : "Add"} Employee</button>
      {editingEmployee && (
        <button type="button" onClick={clearEdit} style={{ marginLeft: "10px" }}>
          Cancel
        </button>
      )}
    </form>
  );
};

export default EmployeeForm;
