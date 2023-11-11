const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

// global middleware
app.use(express.json());

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const secret = "abc";
    const payload = { data: username };
    const token = jwt.sign(payload, secret); // Use 'secret' instead of 'data'

    res.json({ token: token });
});

function verifyToken(req, res, next) {
    const secret = "abc"
    const token = req.headers['authorization']

    console.log(token)

    jwt.verify(token, secret, (err, payload) => {
        if (err) {
            return res.sendStatus(403)
        }
        req.payload = payload
        next()
    })
}

const courses = [
    {
        title: "FSD",
        Author: "KV"
    },
    {
        title: "FE",
        Author: "krishna"
    },
    {
        title: "FSD",
        Author: "Vamsi"
    }
]

app.get("/courses", verifyToken, (req, res) => {
    const name = req.payload.data;
    res.json(courses.filter(c => c.Author === name))
})

app.listen(3000, () => {
    console.log("Server is running...");
});
