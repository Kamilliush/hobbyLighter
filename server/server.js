const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Paths to JSON files
const usersFilePath = path.join(__dirname, "users.json");
const hobbiesFilePath = path.join(__dirname, "hobbies.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Helper functions
const readUsersFromFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data);
};

const writeUsersToFile = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
};

// Registration route
app.post("/api/auth/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const users = readUsersFromFile();

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, email, password: hashedPassword, hobbies: [] };
    users.push(newUser);
    writeUsersToFile(users);

    // Generate token
    const token = jwt.sign({ username: newUser.username }, "secret", { expiresIn: "1h" });

    res.status(201).json({ message: "User registered successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});

// Login route
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

// Endpoint to save user hobbies
app.post("/api/users/hobbies", authenticateToken, (req, res) => {
  const { hobbies } = req.body;
  const username = req.user.username;

  const users = readUsersFromFile();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.hobbies = hobbies;
  writeUsersToFile(users);

  // Update hobby counts
  let hobbiesData = { hobbies: [] };
  if (fs.existsSync(hobbiesFilePath)) {
    const data = fs.readFileSync(hobbiesFilePath, "utf-8");
    hobbiesData = JSON.parse(data);
  }

  hobbies.forEach((selectedHobby) => {
    let hobbyEntry = hobbiesData.hobbies.find((h) => h.name === selectedHobby);
    if (hobbyEntry) {
      hobbyEntry.count += 1;
    } else {
      hobbiesData.hobbies.push({ name: selectedHobby, count: 1 });
    }
  });

  fs.writeFileSync(hobbiesFilePath, JSON.stringify(hobbiesData, null, 2));

  res.status(200).json({ message: "Hobbies saved successfully" });
});

// Endpoint to get user hobbies
app.get("/api/users/hobbies", authenticateToken, (req, res) => {
  const username = req.user.username;

  const users = readUsersFromFile();
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ hobbies: user.hobbies });
});

// Endpoint to get all hobbies
app.get("/api/hobbies", (req, res) => {
  if (!fs.existsSync(hobbiesFilePath)) {
    return res.status(500).json({ message: "Hobbies file not found" });
  }
  const data = fs.readFileSync(hobbiesFilePath, "utf-8");
  const hobbiesData = JSON.parse(data);
  
  // Sort hobbies by count in descending order
  hobbiesData.hobbies.sort((a, b) => b.count - a.count);
  
  // Return the list of hobby names
  res.status(200).json({ hobbies: hobbiesData.hobbies.map((h) => h.name) });
});

// Search hobbies based on query
app.get("/api/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || ""; // Get the search query

  if (!fs.existsSync(hobbiesFilePath)) {
    return res.status(500).json({ message: "Hobbies file not found" });
  }

  try {
    // Read hobbies from the JSON file
    const hobbiesData = JSON.parse(fs.readFileSync(hobbiesFilePath, "utf-8"));
    const hobbies = hobbiesData.hobbies.map((hobby) => hobby.name);

    // Filter hobbies that include the query string (case-insensitive)
    const filteredHobbies = query
      ? hobbies.filter((hobby) => hobby.toLowerCase().includes(query))
      : hobbies; // Return all hobbies if query is empty

    res.json({ results: filteredHobbies });
  } catch (error) {
    console.error("Error reading hobbies:", error);
    res.status(500).json({ message: "Error fetching hobbies" });
  }
});


// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
