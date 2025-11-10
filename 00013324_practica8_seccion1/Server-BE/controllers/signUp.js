import jwt from "jsonwebtoken";

import { pool } from "../data/db/connection.js";
import { JWT_SECRET } from "../keys/keys.js";
import { generateHash } from "../utils/hashes/index.js";

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const hashGenerated = await generateHash(password);

  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashGenerated],
    (error, results) => {
      if (error) {
        throw error;
      }
      const userFind = results.rows[0];
      const _jwt = jwt.sign({ id: userFind.id }, JWT_SECRET, {
        expiresIn: "8h",
      });

      return res
        .status(201)
        .json({
          success: true,
          message: `User added with ID: ${JSON.stringify(userFind)}`,
          _jwt,
          userFind,
        });
    }
  );
};
