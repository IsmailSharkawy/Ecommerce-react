import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import path from 'path'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json()) //to accept json data in body (user login)

app.get('/', (req, res) => {
	res.send('API is running.')
})

app.use('/api/products', productRoutes) //anything using api products will be redirected to productRoutes
app.use('/api/orders', orderRoutes) //anything using api products will be redirected to productRoutes

app.use('/api/users', userRoutes) //anything using api user will be redirected to userRoutes

app.use('/api/upload', uploadRoutes) //anything using api user will be redirected to uploadRoutes

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //taking us to upload folder and making it static using express

app.get('/api/config/paypal', (req, res) => {
	res.send(process.env.PAYPAL_CLIENT_ID)
})

// app.use((err, req, res, next) => {
// 	const statusCode = res.statusCode === 200 ? 500 : res.statusCode
// 	res.status(statusCode)
// 	res.json({
// 		message: err.message,
// 		stack: process.env.NODE_ENv === 'production' ? null : err.stack,
// 	})
// })
const PORT = process.env.PORT || 5000
app.listen(
	PORT,
	console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}`)
)
