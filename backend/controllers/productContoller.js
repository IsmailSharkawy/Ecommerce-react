import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler' //to not have to implement error handlers

//@desc Fetch all products
//@route GET /api/products
//@access public

const getProduct = asyncHandler(async (req, res) => {
	const products = await Product.find({}) //mongoose methods return a promise so use awair async
	res.json(products)
})

//@desc Fetch single products
//@route GET /api/products/:id
//@access public
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		res.json(product)
	} else res.status(404).json({ message: 'Product not found' })
})

export { getProduct, getProductById }
