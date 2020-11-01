import express from 'express'
import {
	getProductById,
	getProduct,
	deleteProduct,
	updateProduct,
	createProduct,
} from '../controllers/productContoller.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

//@desc Fetch all products
//@route GET /api/products
//@access public

router.route('/').get(getProduct).post(protect, admin, createProduct)

//@desc Fetch single products
//@route GET /api/products/:id
//@access public

router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)

export default router
