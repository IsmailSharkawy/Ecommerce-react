import express from 'express'
import {
	getOrderById,
	saveOrderItems,
	updateToPaid,
	getUserOrders,
} from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/users
//@access public

router.route('/').post(protect, saveOrderItems)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateToPaid)

export default router
