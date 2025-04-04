import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;
const isProd = process.env.NODE_ENV === "production";

// Fix: when in production, SSL should be an object (especially for AWS RDS)
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  ssl: isProd ? { rejectUnauthorized: false } : false,
});

// Optional: log connection success
pool
  .connect()
  .then(() =>
    console.log(
      `Connected to ${isProd ? "production" : "development"} database`
    )
  )
  .catch((err) => console.error("Connection error:", err));

const query = (text, params) => pool.query(text, params);

export default { query };
