const express = require("express");
const router = express();
const {Employee} = require("../DB");

router.post("/modalData", async (req, res) => {
  const { EmployeeName, EmployeeEmail, EmployeeAddress, EmployeePhoneno } = req.body;


  try {
    const existingEmployee = await Employee.findOne({ email: EmployeeEmail });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee already exists" });
    }
    const newEmployee = new Employee({
      name: EmployeeName,
      email: EmployeeEmail,
      address: EmployeeAddress,
      phoneNo: EmployeePhoneno,
    });

    await newEmployee.save();

    res
      .status(201)
      .json({ message: "Employee data added successfully", data: newEmployee });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving employee data", error });
  }
});

router.get("/modalData", async (req, res) => {
  try {
    const employees = await Employee.find();
    res
      .status(200)
      .json({
        message: "Employee data retrieved successfully",
        data: employees,
      });
  } catch (error) {
    console.error("Error retrieving employee data:", error);
    res.status(500).json({ message: "Error retrieving employee data", error });
  }
});

// Edit (Update) employee by ID
router.put('/modalData/:id', async (req, res) => {
    const { id } = req.params;
    const { EmployeeName, EmployeeEmail, EmployeeAddress, EmployeePhoneno } = req.body;
  
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        {
          name: EmployeeName,
          email: EmployeeEmail,
          address: EmployeeAddress,
          phoneNo: EmployeePhoneno,
        },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee updated successfully', data: updatedEmployee });
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee data', error });
    }
  });
  
  // Delete employee by ID
  router.delete('/modalData/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(id);
  
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
  
      res.status(200).json({ message: 'Employee deleted successfully', data: deletedEmployee });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Error deleting employee data', error });
    }
  });

  
  router.delete("/modalData", async (req, res) => {
    try {
      await Employee.deleteMany(); // Delete all employees
      res.status(200).json({ message: "All employees deleted successfully" });
    } catch (error) {
      console.error("Error deleting all employees:", error);
      res.status(500).json({ message: "Error deleting all employees", error });
    }
  });
  

module.exports = router;
