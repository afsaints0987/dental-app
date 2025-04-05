import { loginUser, registerUser } from "../service/AuthService.js";

// Register API
export const RegisterUser = async (req, res) => {
  const { first_name, last_name, email, password, repeatPass } = req.body;

  if (!first_name || !last_name || !email) {
    return res.status(400).json({
      message: "Please fill in all fields",
    });
  }
  if (!password) {
    return res.status(400).json({
      message: "Password required",
    });
  }

  if (password !== repeatPass) {
    return res.status(400).json({
      message: "Passwords do not match",
    });
  }

  try {
    const user = await registerUser(first_name, last_name, email, password);

    res.json({
      message: "User Successfully Created",
      user
    })
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      stack: err.stack
    });
  }
};

export const LoginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and Password required" });
  }

  try {
    const user = await loginUser(email, password)
    res.json(user)
  } catch(err){
    return res.status(500).json({
      message: "Internal Server Error", 
      stack: err.stack
    })
  }
};


