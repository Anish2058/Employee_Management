// EmployeeForm.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeForm = ({
  selectedEmployee,
  setSelectedEmployee,
  employees,
  setEmployees,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedEmployee) {
      setName(selectedEmployee.name);
      setEmail(selectedEmployee.email);
      setDepartment(selectedEmployee.department);
      setMessage("");
    } else {
      setName("");
      setEmail("");
      setDepartment("");
      setMessage("");
    }
  }, [selectedEmployee]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (selectedEmployee) {
        // Update user
        const res = await axios.put(
          `http://localhost:8080/api/users/${selectedEmployee.id}`,
          { name, email, department }
        );

        if (res.status === 200) {
          setEmployees((prev) =>
            prev.map((emp) =>
              emp.id === selectedEmployee.id
                ? { ...emp, name, email, department }
                : emp
            )
          );
          setMessage("✅ Employee updated successfully.");
        } else {
          setMessage("❌ Failed to update employee.");
        }
      } else {
        // Add new user
        const res = await axios.post("http://localhost:8080/api/users", {
          name,
          email,
          department,
        });

        if (res.status === 200) {
          const newId = res.data.id;
          const newEmp = { id: newId, name, email, department };
          setEmployees((prev) => [...prev, newEmp]);
          setMessage("✅ " + res.data.message);
        } else {
          setMessage("❌ Failed to add employee.");
        }
      }

      setName("");
      setEmail("");
      setDepartment("");
      setSelectedEmployee(null);
    } catch (error) {
      console.error("Error details:", error.response || error.message || error);
      setMessage("❌ Error saving employee.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>{selectedEmployee ? "Update Employee" : "Add Employee"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Department:</label>
          <input
            type="text"
            value={department}
            required
            onChange={(e) => setDepartment(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : selectedEmployee ? "Update" : "Add"}
        </button>
      </form>

      {message && (
        <p style={{ color: message.includes("❌") ? "red" : "green" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default EmployeeForm;
