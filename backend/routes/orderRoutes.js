import express from 'express'
import {
	getOrderById,
	saveOrderItems,
	updateToPaid,
} from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/users
//@access public

router.route('/').post(protect, saveOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').get(protect, updateToPaid)

export default router
