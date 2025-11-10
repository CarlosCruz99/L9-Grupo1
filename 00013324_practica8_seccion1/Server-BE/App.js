import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import bodyParser from "body-parser";
import cors from "cors";
import controllers from "./controllers/controllers.js";
import {PORT} from "./keys/keys.js"
import userRoutes from "./router/router.js";

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);

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

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)
);