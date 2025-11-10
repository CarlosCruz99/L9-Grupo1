import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import controllers from "./controllers/controllers.js";

const app = express();
const PORT = 5000;
const JWT_SECRET = "your_jwt_secret"; // Use a strong, secure key in production

app.use(bodyParser.json());
app.use(cors());

// Middleware: Verify Token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = user;
    next();
  });
};

// Routes
app.get('/users', verifyToken, controllers.getUsers)
app.get('/users/:id', verifyToken, controllers.getUserById)
app.post('/users', verifyToken, controllers.createUser)
app.put('/users/:id', verifyToken, controllers.updateUser)
app.delete('/users/:id', verifyToken, controllers.deleteUser)

app.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  var stored_hash = '$2b$10$XOHI0.vg73ve9Oy73lqU5.W//tVQuqMIAKJn3n25ZA2DUF.YGm6vq'

  // En el momento que empecé a realizar la guía, habían varias contraseñas sin hash,
  // fuí comparando cada una de las contraseñas para saber cual era, encontrando que la contraseña
  // era 1234, aunque no había un usuario Jerry con esa contraseña.

  // Por lo que, al ingresar un usuario con esa contraseña en el Postman,
  // se puede verificar que es la misma de la variable stored_hash.

  if (await bcrypt.compare(password, stored_hash)) {
    console.log("La contraseña es correcta")
  }
  const token = jwt.sign({ email: email }, JWT_SECRET, { expiresIn: "1h" });
  res.status(200).json({ token });
});

app.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({ message: "Protected data accessed", user: req.user });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);