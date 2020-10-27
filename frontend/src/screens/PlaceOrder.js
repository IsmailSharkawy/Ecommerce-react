import React, { useState } from 'react'
import {
	Button,
	Form,
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
import CheckoutSteps from '../components/CheckoutSteps.js'

import FormContainer from '../components/FormContainer.js'

const PlaceOrder = () => {
	const dispatch = useDispatch()
	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart
	const placeOrderHandler = () => {
		console.log('order placed')
	}

	const itemsPrice = Number(
		cart.cartItems.reduce((acc, item) => acc + item.price, 0)
	)
	const shippingPrice = Number(cart.cartItems.price > 300 ? 0 : 50)
	const taxPrice = Number((itemsPrice * 0.14).toFixed(3))
	const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2)

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
										<ListGroupItem>
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
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping:</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Tax:</Col>
									<Col>${taxPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Total:</Col>
									<Col>${totalPrice}</Col>
								</Row>
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
