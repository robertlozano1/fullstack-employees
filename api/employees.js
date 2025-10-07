import express from "express";
import {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "#db/queries/employees";

const router = express.Router();

// Helper function to validate positive integer
function isValidId(value) {
  const num = parseInt(value);
  return (
    !isNaN(num) && num >= 0 && Number.isInteger(num) && value === num.toString()
  );
}

// Helper function to validate required fields
function validateEmployeeFields(body) {
  return body && body.name && body.birthday && body.salary !== undefined;
}

// GET /employees - Get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (error) {
    next(error);
  }
});

// POST /employees - Create a new employee
router.post("/", async (req, res, next) => {
  try {
    // Check if request body is provided
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    // Check if required fields are present
    if (!validateEmployeeFields(req.body)) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, birthday, salary" });
    }

    const { name, birthday, salary } = req.body;
    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (error) {
    next(error);
  }
});

// GET /employees/:id - Get employee by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID is valid integer
    if (!isValidId(id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const employee = await getEmployee(parseInt(id));

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    next(error);
  }
});

// PUT /employees/:id - Update employee
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if request body is provided
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    // Check if required fields are present
    if (!validateEmployeeFields(req.body)) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, birthday, salary" });
    }

    // Validate ID is valid integer
    if (!isValidId(id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const { name, birthday, salary } = req.body;
    const updatedEmployee = await updateEmployee({
      id: parseInt(id),
      name,
      birthday,
      salary,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

// DELETE /employees/:id - Delete employee
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID is valid integer
    if (!isValidId(id)) {
      return res.status(400).json({ error: "ID must be a positive integer" });
    }

    const deletedEmployee = await deleteEmployee(parseInt(id));

    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
});

export default router;
