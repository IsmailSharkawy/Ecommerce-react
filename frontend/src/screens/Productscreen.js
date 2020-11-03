import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
	Row,
	Col,
	Button,
	Card,
	Image,
	ListGroup,
	ListGroupItem,
	Form,
	Alert,
	FormGroup,
	FormLabel,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createReview } from '../actions/productActions'
import { Loader } from '../components/Loader'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import './ProductScreen.css'

const Productscreen = ({ match, history }) => {
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const reviewCreate = useSelector((state) => state.createReview)
	const { loading: reviewLoading, error: reviewError, success } = reviewCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (success) {
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match, success])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?=${qty}`)
	}
	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			createReview(match.params.id, {
				rating,
				comment,
			})
		)
	}
	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				{ error }
			) : (
				<>
					<Row>
						<Col md={6} className='img-col'>
							<Image src={product.image} alt={product.name} fluid />
						</Col>
						<Col md={3} className='details-column'>
							<ListGroup variant='flush'>
								<ListGroupItem className='prod-title'>
									<h3>{product.name}</h3>
								</ListGroupItem>
								<ListGroupItem>
									<Rating
										value={product.rating}
										text={`${product.numReviews} reviews`}
									/>
								</ListGroupItem>
								<ListGroupItem>Price: ${product.price}</ListGroupItem>
								<ListGroupItem className='description'>
									Description: {product.description}
								</ListGroupItem>
							</ListGroup>
						</Col>
						<Col md={3} className='btn-col'>
							<Card>
								<ListGroup>
									<ListGroupItem>
										<Row>
											<Col>Price:</Col>
											<Col>
												<strong>${product.price}</strong>
											</Col>
										</Row>
									</ListGroupItem>
									<ListGroupItem>
										<Row>
											<Col>Status:</Col>
											<Col>
												<strong>
													{product.countInStock > 0
														? 'In Stock'
														: 'Out of Stock'}
												</strong>
											</Col>
										</Row>
									</ListGroupItem>
									{product.countInStock > 0 ? (
										<ListGroupItem>
											<Row>
												<Col>Qty:</Col>

												<Col>
													<Form.Control
														as='select'
														value={qty}
														onChange={(e) => {
															setQty(e.target.value)
														}}
													>
														{[...Array(product.countInStock).keys()].map(
															(x) => {
																return (
																	<option key={x + 1} value={x + 1}>
																		{x + 1}
																	</option>
																)
															}
														)}
													</Form.Control>
												</Col>
											</Row>
										</ListGroupItem>
									) : null}
									<ListGroupItem>
										<Button
											onClick={addToCartHandler}
											className='btn-block'
											type='button'
											disabled={product.countInStock === 0}
										>
											Add to Cart
										</Button>
									</ListGroupItem>
								</ListGroup>
							</Card>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2 style={{ margin: '16px' }}>Reviews:</h2>
							{reviewError && <Alert variant='danger'>{reviewError}</Alert>}
							{product.reviews.length === 0 && <Alert>No reviews</Alert>}
							<ListGroup variant='flush'>
								{product.reviews.map((review) => (
									<ListGroupItem>
										<p>{review.createdAt.substring(0, 10)}</p>
										<strong>{review.name}:</strong>
										<Rating value={review.rating} />
										<p>{review.comment}</p>
									</ListGroupItem>
								))}

								<h2 style={{ margin: '10px 0' }}>Write a review:</h2>

								{userInfo ? (
									<Form onSubmit={submitHandler}>
										<FormGroup controlId='rating'>
											<FormLabel>Rating:</FormLabel>
											<Form.Control
												as='select'
												value={rating}
												onChange={(e) => setRating(e.target.value)}
											>
												<option>Select...</option>
												<option value='1'>1 - Poor</option>
												<option value='2'>2 - Fair</option>
												<option value='3'>3 - Good</option>
												<option value='4'>4 - Very Good</option>
												<option value='5'>5 - Excellent</option>
											</Form.Control>
										</FormGroup>
										<FormGroup>
											<FormLabel>Review:</FormLabel>
											<Form.Control
												type='textarea'
												placeholder='Insert review here'
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											/>
										</FormGroup>
										<Button type='submit' variant='primary'>
											Submit
										</Button>
									</Form>
								) : (
									<strong>
										Please <Link to='/login'>sign in</Link> to write a review.
									</strong>
								)}
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default Productscreen
