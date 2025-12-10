const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Handle favicon requests
app.get('/favicon.ico', (req, res) => res.status(204));

let employees = [
    { id: 1, name: "Kanishkaa", role: "Manager", address: "Chennai", salary: 50000 },
    { id: 2, name: "Anitha", role: "Developer", address: "Erode", salary: 35000 },
    { id: 3, name: "Ayesha", role: "Tester", address: "Coimbatore", salary: 30000 }
];


app.get("/employees", (req, res) => {
    res.status(200).json(employees);
});


app.get("/employee/:id", (req, res) => {
    const id = Number(req.params.id);
    const emp = employees.find(e => e.id === id);

    if (!emp) {
        return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(emp);
});


app.post("/addemployee", (req, res) => {
    const newEmp = {
        id: req.body.id,
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
        salary: req.body.salary
    };

    employees.push(newEmp);

    res.status(201).json({
        message: "Employee added successfully",
        employees
    });
});


app.put("/updateemployee/:id", (req, res) => {
    const id = Number(req.params.id);
    const empIndex = employees.findIndex(e => e.id === id);

    if (empIndex === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    employees[empIndex] = {
        id,
        name: req.body.name,
        role: req.body.role,
        address: req.body.address,
        salary: req.body.salary
    };

    res.status(200).json({
        message: "Employee updated successfully",
        employees
    });
});


app.delete("/deleteemployee/:id", (req, res) => {
    const id = Number(req.params.id);

    const beforeDelete = employees.length;
    employees = employees.filter(e => e.id !== id);

    if (employees.length === beforeDelete) {
        return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
        message: "Employee deleted successfully",
        employees
    });
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});