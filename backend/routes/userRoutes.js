import express from 'express'
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUser,
	getUsersInChat,
	updateUser,
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'
const router = express.Router()

//@desc Fetch all products
//@route GET /api/users
//@access public

router.post('/login', authUser)
router.route('/').post(registerUser).get(protect, admin, getUsers)
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile)
router.route('/live').get(protect, admin, getUsersInChat)

router
	.route('/:id')
	.delete(protect, admin, deleteUser)
	.get(protect, admin, getUser)
	.put(protect, updateUser)

export default router
