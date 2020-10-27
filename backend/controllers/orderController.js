import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler' //to not have to implement error handlers

//@desc Fetch all products
//@route GET /api/products
//@access public

const saveOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		taxPrice,
		totalPrice,
		shippingPrice,
		itemsPrice,
		paymentMethod,
	} = req.body

	if (orderItems && orderItems.length === 0) {
		res.status(400)
		res.json({ message: 'No order items' })
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			taxPrice,
			totalPrice,
			shippingPrice,
			itemsPrice,
			paymentMethod,
		})
		const createdOrder = order.save()
		res.status(201)
		res.json(createdOrder)
	}
})

export { saveOrderItems }
