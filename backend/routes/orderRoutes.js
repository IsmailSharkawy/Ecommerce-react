import express from 'express'
import { saveOrderItems } from '../controllers/orderController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/users
//@access public

router.route('/').post(protect, saveOrderItems)
export default router
