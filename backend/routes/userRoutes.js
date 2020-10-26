import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
} from '../controllers/userController.js'
import protect from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/users
//@access public

router.post('/login', authUser)
router.post('/', registerUser)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)

export default router
