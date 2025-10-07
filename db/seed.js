import db from "#db/client";
import { createEmployee } from "#db/queries/employees";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  const employees = [
    { name: "Alice Johnson", birthday: "1985-03-15", salary: 75000 },
    { name: "Bob Smith", birthday: "1990-07-22", salary: 68000 },
    { name: "Carol Williams", birthday: "1988-11-08", salary: 82000 },
    { name: "David Brown", birthday: "1992-01-30", salary: 71000 },
    { name: "Eve Davis", birthday: "1987-09-12", salary: 78000 },
    { name: "Frank Miller", birthday: "1989-05-18", salary: 65000 },
    { name: "Grace Wilson", birthday: "1991-12-03", salary: 73000 },
    { name: "Henry Moore", birthday: "1986-04-25", salary: 80000 },
    { name: "Ivy Taylor", birthday: "1993-08-14", salary: 69000 },
    { name: "Jack Anderson", birthday: "1984-10-07", salary: 85000 },
    { name: "Karen Thomas", birthday: "1990-02-28", salary: 76000 },
    { name: "Leo Jackson", birthday: "1988-06-19", salary: 72000 },
  ];

  for (const employee of employees) {
    await createEmployee(employee);
  }
}
