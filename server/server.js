const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Ścieżki do plików
const usersFilePath = path.join(__dirname, "users.json");
const hobbiesFilePath = path.join(__dirname, "hobbies.json");
const postsFilePath = path.join(__dirname, "posts.json");

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Funkcje pomocnicze
const readFromFile = (filePath, defaultValue = []) => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultValue));
  }
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

const writeToFile = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "secret", (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Rejestracja użytkownika
app.post("/api/auth/register", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const users = readFromFile(usersFilePath);

    if (users.find((user) => user.username === username)) {
      return res.status(400).json({ message: "Nazwa użytkownika już istnieje" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { username, email, password: hashedPassword, hobbies: [] };
    users.push(newUser);
    writeToFile(usersFilePath, users);

    const token = jwt.sign({ username: newUser.username }, "secret", { expiresIn: "1h" });

    res.status(201).json({ message: "Użytkownik zarejestrowany pomyślnie", token });
  } catch (err) {
    res.status(500).json({ message: "Wystąpił błąd", error: err.message });
  }
});

// Logowanie użytkownika
app.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const users = readFromFile(usersFilePath);

    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }

    const token = jwt.sign({ username: user.username }, "secret", { expiresIn: "1h" });
    res.status(200).json({ message: "Logowanie udane", token });
  } catch (err) {
    res.status(500).json({ message: "Wystąpił błąd", error: err.message });
  }
});

// Zapis hobby użytkownika
app.post("/api/users/hobbies", authenticateToken, (req, res) => {
  const { hobbies } = req.body;
  const username = req.user.username;

  const users = readFromFile(usersFilePath);
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "Użytkownik nie znaleziony" });
  }

  user.hobbies = hobbies;
  writeToFile(usersFilePath, users);

  let hobbiesData = readFromFile(hobbiesFilePath, { hobbies: [] });

  hobbies.forEach((selectedHobby) => {
    let hobbyEntry = hobbiesData.hobbies.find((h) => h.name === selectedHobby);
    if (hobbyEntry) {
      hobbyEntry.count += 1;
    } else {
      hobbiesData.hobbies.push({ name: selectedHobby, count: 1 });
    }
  });

  writeToFile(hobbiesFilePath, hobbiesData);

  res.status(200).json({ message: "Hobby zapisane pomyślnie" });
});

// Pobieranie hobby użytkownika
app.get("/api/users/hobbies", authenticateToken, (req, res) => {
  const username = req.user.username;

  const users = readFromFile(usersFilePath);
  const user = users.find((u) => u.username === username);
  if (!user) {
    return res.status(404).json({ message: "Użytkownik nie znaleziony" });
  }

  res.status(200).json({ hobbies: user.hobbies });
});

// Pobieranie wszystkich hobby
app.get("/api/hobbies", (req, res) => {
  const hobbiesData = readFromFile(hobbiesFilePath, { hobbies: [] });

  hobbiesData.hobbies.sort((a, b) => b.count - a.count);

  res.status(200).json({ hobbies: hobbiesData.hobbies.map((h) => h.name) });
});

// Wyszukiwanie hobby
app.get("/api/search", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";

  const hobbiesData = readFromFile(hobbiesFilePath, { hobbies: [] });
  const hobbies = hobbiesData.hobbies.map((hobby) => hobby.name);

  const filteredHobbies = query
    ? hobbies.filter((hobby) => hobby.toLowerCase().includes(query))
    : hobbies;

  res.json({ results: filteredHobbies });
});

// Zarządzanie postami
// Pobieranie postów
app.get("/api/posts", (req, res) => {
  try {
    const posts = readFromFile(postsFilePath);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas odczytu postów" });
  }
});

// Dodawanie nowego posta
app.post("/api/posts", (req, res) => {
  try {
    const posts = readFromFile(postsFilePath);
    const newPost = { ...req.body, id: Date.now(), likes: 0, comments: [] };
    posts.push(newPost);
    writeToFile(postsFilePath, posts);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas dodawania posta" });
  }
});

// Lajkowanie posta
app.patch("/api/posts/:id/like", (req, res) => {
  try {
    const posts = readFromFile(postsFilePath);
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post nie znaleziony" });
    post.likes++;
    writeToFile(postsFilePath, posts);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas lajkowania posta" });
  }
});

// Dislajkowanie posta
app.patch("/api/posts/:id/dislike", (req, res) => {
  try {
    const posts = readFromFile(postsFilePath);
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post nie znaleziony" });
    if (post.likes > 0) post.likes--;
    writeToFile(postsFilePath, posts);
    res.status(200).send();
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas dislajkowania posta" });
  }
});

// Dodawanie komentarza
app.post("/api/posts/:id/comments", (req, res) => {
  try {
    const posts = readFromFile(postsFilePath);
    const post = posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ message: "Post nie znaleziony" });
    const newComment = { ...req.body };
    post.comments.push(newComment);
    writeToFile(postsFilePath, posts);
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Błąd podczas dodawania komentarza" });
  }
});

// Start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});
