const mysql = require('mysql2')

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


async function main() {
    //Read all Employees
    const answer = await readEmployee()
    console.log(answer)

    //Read by Id
    const emploee = await readEmployeeById(1)
    console.log(emploee)

    //Insert Data
    // const newEmp = await InsertEmployee(5, "Amol", "Pune", "300000", 38)
    // console.log(newEmp)

    //update data
    const updatedEmp = await updateEmployee(1, "Vizag")
    console.log(updatedEmp)

    const deleteEmp = await deleteEmployee(4)
    console.log(deleteEmp)

}

main(); // Call the async function to start the execution.
