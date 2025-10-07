import express from "express";
import employeesRouter from "#api/employees";

const app = express();

// Body parsing middleware
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Employee routes
app.use("/employees", employeesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
