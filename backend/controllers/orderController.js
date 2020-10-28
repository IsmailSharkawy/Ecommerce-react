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
		const createdOrder = await order.save()
		res.status(201)
		res.json(createdOrder)
	}
})

const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate(
		'user',
		'name email'
	) //populate ?????

	if (order) {
		res.json(order)
	} else {
		res.status(404).json({ message: 'Order not found' })
	}
})

const updateToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id)

	if (order) {
		order.isPaid = true
		order.paidAt = Date.now()
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		}

		updatedOrder = await order.save()
		res.json(updatedOrder)
	} else {
		res.status(404).json({ message: 'Order not found' })
	}
})

export { saveOrderItems, getOrderById, updateToPaid }
