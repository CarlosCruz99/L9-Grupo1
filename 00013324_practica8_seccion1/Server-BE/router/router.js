import express from "express";

// imports de módulos para validaciones
import { verifyToken } from "../utils/middleware/index.js";

// Módulos controladores importados
import { signIn } from "../controllers/signin.js";
import { signUp } from "../controllers/signup.js";
import { getUsers } from "../controllers/getUsers.js";
import {getUserById} from "../controllers/getUserById.js"
import { updateUser } from "../controllers/updateUser.js";
import { deleteUser } from "../controllers/deleteUser.js";

// creación del enrutador 
const router = express.Router();

// Routes
router.post("/signin", signIn);
router.post("/signup", signUp);
router.get("/users", verifyToken, getUsers);
router.get("/users/:id", verifyToken, getUserById);
router.put("/users/:id", verifyToken, updateUser);
router.delete('/users/:id', verifyToken, deleteUser);

export default router;