import express from 'express'
import { getProductById, getProduct } from '../controllers/productContoller.js'

const router = express.Router()

//@desc Fetch all products
//@route GET /api/products
//@access public

router.get('/', getProduct)

//@desc Fetch single products
//@route GET /api/products/:id
//@access public

router.get('/:id', getProductById)

export default router
