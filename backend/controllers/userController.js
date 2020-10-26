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
		})
	} else {
		res.status(401).json('User not found')
	}
})

export { authUser, getUserProfile, registerUser, updateUserProfile }
