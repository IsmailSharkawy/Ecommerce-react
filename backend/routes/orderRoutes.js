import express from 'express'
import {
	getOrderById,
	saveOrderItems,
	updateToPaid,
	getUserOrders,
	updateToShipped,
} from '../controllers/orderController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/users
//@access public

router.route('/').post(protect, saveOrderItems)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateToPaid)
router.route('/:id/ship').put(protect, admin, updateToShipped)

export default router
