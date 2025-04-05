import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const isProd = process.env.NODE_ENV === "production";

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

pool
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => console.log("Connection Error:", err));

const query = (text, params) => pool.query(text, params);

export default { query };
