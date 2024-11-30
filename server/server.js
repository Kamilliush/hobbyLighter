const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Ścieżka do pliku JSON
const usersFilePath = path.join(__dirname, "users.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Funkcja do odczytu użytkowników z pliku JSON
const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
};

// Funkcja do zapisu użytkowników do pliku JSON
const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Trasa rejestracji
app.post("/api/auth/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = readUsersFromFile();

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    writeUsersToFile(users);

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// Trasa logowania
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = readUsersFromFile();

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" });
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

