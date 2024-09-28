import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditMode, setEditMode] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [EmployeeName, setEmployeeName] = useState("");
  const [EmployeeEmail, setemail] = useState("");
  const [EmployeeAddress, setaddress] = useState("");
  const [EmployeePhoneno, setphoneno] = useState("");
  const [Employee, setEmployee] = useState([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditMode(false);
    resetForm();
  };

  useEffect(() => {
    async function fetchEmployees() {
      const fetchData = await fetch("http://localhost:5000/modalData");
      const data = await fetchData.json();
      setEmployee(data.data);
    }
    fetchEmployees();
  }, []);

  const resetForm = () => {
    setEmployeeName("");
    setemail("");
    setaddress("");
    setphoneno("");
    setCurrentEmployeeId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        // Send PUT request to update the employee
        const response = await axios.put(
          `http://localhost:5000/modalData/${currentEmployeeId}`,
          {
            EmployeeName,
            EmployeeEmail,
            EmployeeAddress,
            EmployeePhoneno,
          }
        );
        alert("Response: " + response.data.message); // Display response message
      } else {
        // Send POST request to create a new employee
        const response = await axios.post("http://localhost:5000/modalData", {
          EmployeeName,
          EmployeeEmail,
          EmployeeAddress,
          EmployeePhoneno,
        });
        alert("Response: " + response.data.message); // Display response message
      }

      // Reset form fields
      resetForm();
      handleCloseModal();
    } catch (error) {
      alert(
        "Error submitting data: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  const handleEditClick = (employee) => {
    setCurrentEmployeeId(employee._id); // Set the employee ID for editing
    setEmployeeName(employee.name);
    setemail(employee.email);
    setaddress(employee.address);
    setphoneno(employee.phoneNo);
    setEditMode(true); // Enable edit mode
    handleOpenModal();
  };

  const handleDeleteClick = async (employeeId) => {
    try {
      await axios.delete(`http://localhost:5000/modalData/${employeeId}`);
      alert("Employee deleted successfully");

      // Remove the deleted employee from the local state
      setEmployee((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== employeeId)
      );
    } catch (error) {
      alert(
        "Error deleting employee: " +
          (error.response?.data?.message || error.message)
      );
    }
  }

  const handleDeleteAll = async () => {
    if (window.confirm("Are you sure you want to delete all employees?")) {
      try {
        await axios.delete("http://localhost:5000/modalData"); // Call backend delete route
        alert("All employees deleted successfully");
  
        // Update the local state to remove all employees
        setEmployee([]);
      } catch (error) {
        alert(
          "Error deleting all employees: " +
            (error.response?.data?.message || error.message)
        );
      }
    }
  };

  return (
    <>
      <div className="flex bg-slate-400">
        <div className="text-2xl font-semibold text-left mb-2 mt-2 ml-2">
          MANAGE EMPLOYEES
        </div>
        <div className="flex space-x-2 ml-auto justify-end mb-2 mt-2 mr-2 ">
          <button className="bg-red-600 text-white px-4 py-2 rounded"
          onClick={handleDeleteAll}>
            Delete All
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded"
            onClick={handleOpenModal}
          >
            Add New Employee
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Employee" : "Add Employee"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full"
                  value={EmployeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  type="email"
                  className="border rounded px-3 py-2 w-full"
                  value={EmployeeEmail}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">ADDRESS</label>
                <textarea
                  className="border rounded px-3 py-2 w-full"
                  value={EmployeeAddress}
                  onChange={(e) => setaddress(e.target.value)}
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block mb-2">Phone NO.</label>
                <input
                  type="number"
                  className="border rounded px-3 py-2 w-full"
                  value={EmployeePhoneno}
                  onChange={(e) => setphoneno(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  {isEditMode ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mb-4">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Employee Name</th>
              <th className="py-2 px-4 border-b text-left">Employee Email</th>
              <th className="py-2 px-4 border-b text-left">Employee Address</th>
              <th className="py-2 px-4 border-b text-left">
                Employee Phone No
              </th>
              <th className="py-2 px-4 border-b text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {Employee.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.email}</td>
                <td className="py-2 px-4 border-b">{item.address}</td>
                <td className="py-2 px-4 border-b">{item.phoneNo}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
