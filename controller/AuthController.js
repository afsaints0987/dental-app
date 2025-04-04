import bcrypt from "bcryptjs";
import { generateToken } from "../middleware/AuthMiddleware.js";
import db from "../config/db.js";

// Register API
export const RegisterUser = async (req, res) => {
  const { first_name, last_name, email, password, repeatPass } = req.body;

  if (!first_name || !last_name || !email) {
    res.status(400).json({
      message: "Please fill in all fields",
    });
  }
  if (!password) {
    res.status(400).json({
      message: "Password required",
    });
  }

  if (password !== repeatPass) {
    res.status(400).json({
      message: "Passwords do not match",
    });
  }
  // User existing already
  const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (userCheck.rows.length > 0) {
    res.status(400).json({
      message: "User already exists",
    });
  }
  //

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const createNewUser = `INSERT INTO users (firstname, lastname, email, password) 
                               VALUES ($1, $2, $3, $4) RETURNING id, firstname, lastname, email`;
    const newUser = await db.query(createNewUser, [
      first_name,
      last_name,
      email,
      hashedPassword,
    ]);
    const user = newUser.rows[0];
    const token = generateToken(user);

    res.json({
      message: "User created successfully",
      user,
      token,
    });
  } catch (err) {
    throw Error(err.message);
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password required" });
  }

  // Fetch user from the database if existing
  const result = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  //

  if (!user || !bcrypt.compareSync(password, user.password)) {
    res.status(400).json({ message: "Invalid Credentials" });
  }

  try {
    const token = generateToken(user);
    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } catch (err) {
    throw Error(err.message);
  }
};

export const DisplayUser = async (req, res) => {
  const { id } = req.user;
  const fetchUser = "SELECT * FROM users WHERE id = $1";
  const result = await db.query(fetchUser, [id]);

  const user = result.rows[0];
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};
