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

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)

	if (product) {
		await product.remove()
		res.json({ message: 'Product deleted' })
	} else res.status(404).json({ message: 'Product not found' })
})

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		category: 'Sample category',
		brand: 'Sample brand',
		description: 'Sample description',
		image: '/images/sample.jpg',
		countInStock: 0,
		user: req.user._id,
		numReviews: 0,
	})

	const createdProduct = await product.save()
	res.status(201).json(createdProduct)
})

const updateProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	const {
		name,
		price,
		category,
		brand,
		description,
		image,
		countInStock,
	} = req.body
	if (product) {
		product.name = name
		product.price = price
		product.category = category
		product.brand = brand
		product.description = description
		product.image = image
		product.countInStock = countInStock

		const updatedProduct = await product.save()
		res.json(updatedProduct)
	} else res.status(404).json({ message: 'Product not found' })
})

export {
	getProduct,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
}
