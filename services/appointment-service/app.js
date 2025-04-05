import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();
const port = process.env.PORT || 5002
const app = express();

app.use(cors({
	origin: '*'
}))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Server is running on port ${port}`)
})




