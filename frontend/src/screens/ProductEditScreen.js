import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProductDetails, updateProduct } from '../actions/productActions.js'
import FormContainer from '../components/FormContainer.js'
import { Loader } from '../components/Loader'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants.js'

export const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState(0)
	const [category, setCategory] = useState('')
	const [brand, setBrand] = useState('')
	const [description, setDescription] = useState('')
	const [image, setImage] = useState('')
	const [countInStock, setCountInStock] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()
	// const redirect = location.search ? location.search.split('=')[1] : '/'

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate

	useEffect(() => {
		if (success) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			history.push('/admin/productslist')
		} else {
			if (!product.name || product._id != productId)
				dispatch(listProductDetails(productId))
			else {
				setName(product.name)
				setPrice(product.price)
				setCategory(product.category)
				setBrand(product.brand)
				setDescription(product.description)
				setImage(product.image)
				setCountInStock(product.countInStock)
			}
		}
	}, [dispatch, product, productId, history, success])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				category,
				brand,
				description,
				image,
				countInStock,
			})
		)
	}

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
			const { data } = await axios.post('/api/upload', formData, config)
			setImage(data)
			setUploading(false)
		} catch (error) {
			console.log(error)
			setUploading(false)
		}
	}
	return (
		<>
			<Link to='/admin/productslist' className='btn btn-light my-3'>
				Go back
			</Link>

			<FormContainer>
				<h1>Edit Product:</h1>

				{loadingUpdate && <Loader />}
				{errorUpdate && <Alert variant='danger'>{errorUpdate}</Alert>}
				{loading ? (
					<Loader />
				) : error ? (
					<Alert variant='danger'>{error}</Alert>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='Name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter price'
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='category'>
							<Form.Label>Category </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Category'
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Label>Brand </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter brand'
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Label>Description </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Description'
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='Image'>
							<Form.Label>Image </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Image url'
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
							<Form.File
								id='image-file'
								label='Choose file'
								custom
								onChange={uploadFileHandler}
							></Form.File>
						</Form.Group>
						{uploading && <Loader />}
						<Form.Group controlId='countinstock'>
							<Form.Label>Count In Stock </Form.Label>
							<Form.Control
								type='text'
								placeholder='Enter Count In Stock'
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	)
}
