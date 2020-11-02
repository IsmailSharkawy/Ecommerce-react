import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler' //to not have to implement error handlers

//@desc Fetch all products
//@route GET /api/products
//@access public

const getProduct = asyncHandler(async (req, res) => {
	const keyword = req.query.keyword // ? in get request
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i', //case insensitive
				},
		  }
		: {}

	const pageSize = 2
	const page = Number(req.query.pageNumber) || 1

	const count = await Product.countDocuments({ ...keyword })
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1)) //mongoose methods return a promise so use await async
	res.json({
		products,
		page,
		pages: Math.ceil(count / pageSize),
	})
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

const createReview = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id)
	const { rating, comment } = req.body
	if (product) {
		const alreadyReviewed = product.reviews.find(
			(r) => r.user.toString() === req.user._id.toString()
		)
		if (alreadyReviewed) {
			res.status(400).json({ message: 'Product already reviewed' })
		} else {
			const review = {
				name: req.user.name,
				rating: Number(rating),
				comment,
				user: req.user._id,
			}
			product.reviews.push(review)

			product.numReviews = product.reviews.length

			product.rating =
				product.reviews.reduce((acc, review) => review.rating + acc, 0) /
				product.reviews.length

			await product.save()
			res.status(201).json({ message: 'Review added' })
		}
	} else res.status(404).json({ message: 'Product not found' })
})

const topProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({}).sort('-1').limit(3)

	if (products) {
		res.json(products)
	} else res.status(404).json({ message: 'Not enough products' })
})

export {
	getProduct,
	getProductById,
	deleteProduct,
	createProduct,
	updateProduct,
	createReview,
	topProducts,
}
