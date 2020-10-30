import React, { useEffect } from 'react'
import {
	Button,
	Row,
	Col,
	ListGroup,
	ListGroupItem,
	Alert,
	Image,
	Card,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { createOrder } from '../actions/orderActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'

const PlaceOrder = ({ history }) => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	cart.itemsPrice = Number(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = Number(cart.cartItems.price > 300 ? 0 : 50)
	cart.taxPrice = Number((cart.itemsPrice * 0.14).toFixed(3))
	cart.totalPrice = Number(
		cart.itemsPrice + cart.shippingPrice + cart.taxPrice
	).toFixed(2)

	const orderCreate = useSelector((state) => state.createOrder)
	const { success, error, order } = orderCreate

	useEffect(() => {
		if (success) history.push(`/order/${order._id}`)
		if (!userInfo) history.push('/login')
	}, [order, success, history, userInfo])
	const placeOrderHandler = (e) => {
		e.preventDefault()
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				taxPrice: cart.taxPrice,
				shippingPrice: cart.shippingPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}

	return (
		<>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={6} className='mx-3'>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h3>Shipping:</h3>
							<p>
								<strong> Address: </strong>
								{shippingAddress.address}, {shippingAddress.city}{' '}
								{shippingAddress.postalCode}, {shippingAddress.country}
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h3>Payment Method:</h3>
							<p>
								<strong> Method: </strong>
								{cart.paymentMethod}
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h3>Order Items:</h3>
							{cart.cartItems.length === 0 ? (
								<Alert variant='warning'>Your cart is empty</Alert>
							) : (
								<ListGroup variant='flush'>
									{cart.cartItems.map((item, index) => (
										<ListGroupItem key={item.name}>
											<Row>
												<Col md={3}>
													<Image src={item.image} fluid rounded />
												</Col>
												<Col md={4}>
													<Link to={`/product/item.product`}>{item.name}</Link>
												</Col>
												<Col md={3}>${item.qty * item.price}</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>

				<Col md={5}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h3>Order Summary:</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Items:</Col>
									<Col>${cart.itemsPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping:</Col>
									<Col>${cart.shippingPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Tax:</Col>
									<Col>${cart.taxPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Total:</Col>
									<Col>${cart.totalPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								{error && <Alert variant='danger'>{error}</Alert>}
							</ListGroupItem>
							<ListGroupItem>
								<Button
									type='button'
									className='btn-block'
									disabled={cart.cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrder
