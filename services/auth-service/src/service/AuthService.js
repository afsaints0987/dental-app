import db from "../../config/db.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../middleware/AuthMiddleware.js"

export const registerUser = async (first_name, last_name, email, password) => {
    const userCheck = await db.query("SELECT * FROM users WHERE email = $1", [email])

    if(userCheck.rows.length > 0){
        throw new Error("User already exists.")
    }

    const hashedPassword = bcrypt.hashSync(password, 10)
    const createNewUser = `INSERT INTO users (firstname, lastname, email, password)
    VALUES ($1, $2, $3, $4) RETURNING *`

    const newUser = await db.query(createNewUser, [first_name, last_name, email, hashedPassword])
    const user = newUser.rows[0]
    const token = generateToken(user)

    return {
        user, token
    }
}

export const loginUser = async (email, password) => {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email])
    const user = result.rows[0]

    if(!user || !bcrypt.compareSync(password, user.password)){
        throw new Error("Invalid credentials")
    }
    const token = generateToken({
        id: user.id,
        email: user.email
    })

    return {token}
}