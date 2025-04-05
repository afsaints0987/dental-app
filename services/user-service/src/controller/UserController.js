import db from "../../config/db.js";

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
