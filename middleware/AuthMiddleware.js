import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretKey = process.env.JWT_SECRET

export const generateToken = user => {
    return jwt.sign({
        id: user.id,
        first_name: user.firstname,
        last_name: user.lastname,
        email: user.email,
    }, secretKey, {
        expiresIn: '1h',
    })
}

export const authenticateToken = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if(!token){
        return res.status(401).json({message: "Unauthorized"})
    }

    try {
        const decodedToken = jwt.verify(token, secretKey)
        req.user = decodedToken
        next()
    } catch(err){
        return res.status(403).json({
            message: "Forbidden"
        })
    }
} 