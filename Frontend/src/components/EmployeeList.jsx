// EmployeeList.jsx

import axios from "axios";
import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const fetchEmployees = async () => {
    setLoading(true);
    setFetchError("");
    try {
      const res = await axios.get("http://localhost:8080/api/users");
      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err.response || err.message || err);
      setFetchError("❌ Failed to load employees.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
      if(selectedEmployee && selectedEmployee.id === id){
        setSelectedEmployee(null);
      }
    } catch (err) {
      console.error("Delete failed", err.response || err.message || err);
      alert("❌ Failed to delete employee. Please try again.");
      fetchEmployees(); // fallback to sync with backend
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div>
      <h2>Employee List</h2>

      {loading && <p>Loading employees...</p>}
      {fetchError && <p style={{ color: "red" }}>{fetchError}</p>}

      {!loading && employees.length === 0 && <p>No employees available.</p>}

      {employees.map((emp) => (
        <div key={emp.id} style={{ marginBottom: "10px" }}>
          <p>
            <strong>{emp.name}</strong> — {emp.email} — {emp.department}
          </p>
          <button onClick={() => handleEdit(emp)}>Edit</button>{" "}
          <button onClick={() => deleteEmployee(emp.id)}>Delete</button>
        </div>
      ))}

      <EmployeeForm
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
        employees={employees}
        setEmployees={setEmployees}
      />
    </div>
  );
};

export default EmployeeList;
