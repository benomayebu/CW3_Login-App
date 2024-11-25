const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));


// Home page
app.get("/", (req, res) => {
    res.send(`
        <h1>Welcome to the CW3 Application</h1>
        <a href="/register">Register</a> | <a href="/login">Login</a>
    `);
});

// Register page
app.get("/register", (req, res) => {
    res.send(`
        <h1>Register</h1>
        <form action="/register" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br><br>
            <button type="submit">Register</button>
        </form>
    `);
});

// Register handler
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    // Check if the user already exists
    if (users.some((user) => user.username === username)) {
        return res.send("Username already exists, please try another.");
    }

    users.push({username, password});
    res.send("Registration successful! <a href='/login'>Login</a>");
});

// Login page
app.get("/login", (req, res) => {
    res.send(`
        <h1>Login</h1>
        <form action="/login" method="post">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
            <br><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
            <br><br>
            <button type="submit">Login</button>
        </form>
    `);
});

// Login handler
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    // Find the user
    const user = users.find((user) => user.username === username);
    if (!user) {
        return res.send("Invalid username.");
    }

    if (password != user.password) {
        return res.send("Invalid password.");
    }

    res.send(`Welcome, ${username}! <a href='/'>Go to Home</a>`);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
