import express from 'express'
import {
	getProductById,
	getProduct,
	deleteProduct,
	updateProduct,
	createProduct,
	createReview,
	topProducts,
	addToFavorites,
	removeFromFavorites,
	getFromFavorites,
	getProducts,
} from '../controllers/productContoller.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

//@desc Fetch all products
//@route GET /api/products
//@access public

router.route('/').get(getProduct).post(protect, admin, createProduct)
router.route('/allprod').get(getProducts)

//@desc Fetch single products
//@route GET /api/products/:id
//@access public

router.get('/top', topProducts)

router
	.route('/:id')
	.get(getProductById)
	.delete(protect, admin, deleteProduct)
	.put(protect, admin, updateProduct)
router.route('/:id/review').post(protect, createReview)
router.route('/:id/add').put(protect, addToFavorites)
router.route('/:id/remove').put(protect, removeFromFavorites)
router.route('/:id/get').get(protect, getFromFavorites)

export default router
