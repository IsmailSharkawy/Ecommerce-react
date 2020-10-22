import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/products
//@access public

router.post('/login', authUser)
router.post('/', registerUser)
router.route('/profile').get(protect, getUserProfile)

export default router
