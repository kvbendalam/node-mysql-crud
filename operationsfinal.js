const mysql = require('mysql2')
const express = require('express')

const app = express()

app.use(express.json());

const connection = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "password",
    database: "school"
}).promise()

async function readEmployee() {
    const query = "SELECT * FROM Employee";
    try {
        const [output] = await connection.query(query);
        return output;
    } catch (error) {
        console.error(error);
        throw error; // You might want to handle errors more gracefully in your application.
    }
}

async function readEmployeeById(id) {
    const query = "SELECT * FROM Employee WHERE id = ?";
    const values = [id];

    try {
        const [output] = await connection.query(query, values);
        return output;
    } catch (error) {
        console.error(error);
        throw error; // You might want to handle errors more gracefully in your application.
    }
}

async function InsertEmployee(id, name, city, salary, age) {
    const query = "INSERT INTO Employee (id, name, city, salary, age) VALUES (?, ?, ?, ?, ?)";
    const values = [id, name, city, salary, age];

    try {
        const [output] = await connection.query(query, values);
        return output;
    } catch (error) {
        console.error(error);
        throw error; // You might want to handle errors more gracefully in your application.
    }
}


async function updateEmployee(id, city) {
    const query = "UPDATE Employee SET city = ? WHERE id = ?";
    const values = [city, id];

    try {
        await connection.query(query, values);
        return `Updated sucessfully - Employee with ID ${id} updated to city ${city}`;
    } catch (error) {
        console.error(error);
        throw error; // You might want to handle errors more gracefully in your application.
    }
}

async function deleteEmployee(id) {
    const query = "delete from Employee where id = ?"
    const values = [id]

    try {
        await connection.query(query, values);
        return `Deleted sucessfully`
    } catch (error) {
        console.log(error)
        throw error;
    }
}


app.get("/Employee", async (req, res) => {
    const answer = await readEmployee()
    res.send(answer)
})

app.get("/Employee/:id", async (req, res) => {
    const id = req.params.id
    const emploee = await readEmployeeById(id)
    res.send(emploee)
})

app.post("/newEmp", async (req, res) => {
    console.log(req.body)
    const { id, name, city, salary, age } = req.body
    const newEmp = await InsertEmployee(id, name, city, salary, age)
    res.send(newEmp)
})

app.put("/update", async (req, res) => {
    const { id, city } = req.body
    const updatedEmp = await updateEmployee(id, city)
    res.send(updatedEmp)
})

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id
    const emp = await deleteEmployee(id)
    res.send(emp)
})

app.listen(3000, () => {
    console.log("Server is running on 3000")
})