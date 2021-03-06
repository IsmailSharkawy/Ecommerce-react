import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'

import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler' //to not have to implement error handlers

//@desc Fetch all products
//@route GET /api/products
//@access public

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body

	const user = await User.findOne({ email: email })

	if (user) {
		bcrypt.compare(password, user.password, (err, response) => {
			if (response) {
				return res.json({
					_id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
					token: generateToken(user._id),
					inChat: user.inChat,
				})
			} else if (err) {
				res.json({
					message: 'error occured',
				})
			}
			// {
			// 	return res.json({
			// 		success: false,
			// 		message: 'Invaild email or password',
			// 	})
			// 	// throw new Error('Invalid email or password')
			// }
			else {
				res.status(401).json({
					message: 'Incorrect password',
					success: false,
				})
			}
		})
	} else {
		res.status(401).json({
			message: "Account doesn't exist",
			success: false,
		})
	}
})

const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)
	if (user) {
		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		})
	} else {
		res.status(404).json('User not found')
	}
})

const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({})
	if (users) {
		res.json(users)
	} else {
		res.status(404).json('No users exist')
	}
})

const getUser = asyncHandler(async (req, res) => {
	const user = await await User.findById(req.params.id).select('-password') //-password to get all info of user except password
	if (user) {
		res.json(user)
	} else {
		res.status(404).json('User no found')
	}
})

const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)
	if (user) {
		await user.remove()
		res.json({
			message: 'User deleted',
		})
	} else {
		res.status(404).json('User not found')
	}
})

const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.password = req.body.password || user.password

		if (req.body.password) {
			user.password = req.body.password
		}

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
		})
	} else {
		res.status(404).json('User not found')
	}
})

const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id)

	if (user) {
		user.name = req.body.name || user.name
		user.email = req.body.email || user.email
		user.isAdmin = req.body.isAdmin
		user.inChat = req.body.inChat

		const updatedUser = await user.save()

		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			inChat: updatedUser.inChat,
		})
	} else {
		res.status(404).json('User not found')
	}
})

const getUsersInChat = asyncHandler(async (req, res) => {
	const users = await User.find({ inChat: true })

	if (users) {
		res.json(users)
	} else {
		res.status(404).json('No users in chat')
	}
})

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body

	const userExists = await User.findOne({ email: email })

	if (userExists) {
		res.status(400).json('User already exists')
	}

	const user = await User.create({
		name,
		email,
		password,
	})
	if (user) {
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			inChat: false,
		})
	} else {
		res.status(401).json('User not found')
	}
})

export {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUser,
	updateUser,
	getUsersInChat,
}
