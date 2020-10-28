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
import { Loader } from '../components/Loader'
import { getOrderById } from '../actions/orderActions.js'

const OrdersScreen = ({ match }) => {
	const dispatch = useDispatch()
	const orderId = match.params.id
	const getOrder = useSelector((state) => state.getOrder)
	const { loading, error, order } = getOrder

	if (order) {
		order.itemsPrice = order.orderItems.reduce(
			(acc, item) => acc + item.price * item.qty,
			0
		)
	}
	useEffect(() => {
		console.log(match.params.id)

		dispatch(getOrderById(orderId))
	}, [])

	return loading ? (
		<Loader />
	) : error ? (
		<Alert variant='danger'> {error} </Alert>
	) : (
		<>
			<h1 style={{ marginBottom: '50px', marginTop: '30px' }}>
				Order {order._id}
			</h1>
			<Row>
				<Col pd={6}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h3>Shipping:</h3>
							<p>
								<strong>Name:</strong> {order.user.name}
							</p>
							<p>
								<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
							</p>
							<p>
								<strong> Address: </strong>
								{order.shippingAddress.address}, {order.shippingAddress.city}{' '}
								{order.shippingAddress.postalCode},{' '}
								{order.shippingAddress.country}
							</p>
							{order.isDelivered ? (
								<Alert variant='success'>
									Delivered on {order.deliveredAt}
								</Alert>
							) : (
								<Alert variant='danger'>Not Delivered</Alert>
							)}
						</ListGroupItem>
						<ListGroupItem>
							<h3>Payment Method:</h3>
							<p>
								<strong> Method: </strong>
								{order.paymentMethod}
							</p>
							{order.isPaid ? (
								<Alert variant='success'>Paid on {order.paidAt}</Alert>
							) : (
								<Alert variant='danger'>Not Paid</Alert>
							)}
						</ListGroupItem>
						<ListGroupItem>
							<h3>Order Items:</h3>
							{order.orderItems.length === 0 ? (
								<Alert variant='warning'>Your order is empty</Alert>
							) : (
								<ListGroup variant='flush'>
									{order.orderItems.map((item, index) => (
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

				<Col className='py-6'>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h3>Order Summary:</h3>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Items:</Col>
									<Col>${order.itemsPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping:</Col>
									<Col>${order.shippingPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Tax:</Col>
									<Col>${order.taxPrice}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Total:</Col>
									<Col>${order.totalPrice}</Col>
								</Row>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	)
}

export default OrdersScreen
