import React, { useEffect, Fragment } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getOrders } from '../actions/orderActions'
import { Loader } from '../components/Loader'

const OrdersListScreen = ({ history }) => {
	const ordersList = useSelector((state) => state.ordersList)
	const { loading, error, orders } = ordersList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const dispatch = useDispatch()
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(getOrders())
		else {
			history.push('/login')
		}
	}, [dispatch, userInfo, history])

	const deleteHandler = (id) => {
		//if(window.confirm('Are you sure')) if i want a pop up confirmation window
		// dispatch(deleteUser(id))
	}
	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : error ? (
				<Alert variant='danger'>{error}</Alert>
			) : (
				<Table hover bordered striped responsive className='table-sm'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Recipient</th>
							<th>Date</th>

							<th>Delivered? </th>
							<th>Paid? </th>
							<th>Cost</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user.name}</td>

								<td>
									{order.createdAt
										.substring(0, 10)
										.split('-')
										.reverse()
										.join('-')}
								</td>

								<td>
									{order.isDelivered ? (
										order.paidAt.substring(0, 10).split('-').reverse().join('-')
									) : (
										<i
											className='fas fa-times'
											style={{
												color: 'red',
												textAlign: 'center',
												verticalAlign: 'center',
												display: 'inline-block',
												width: '100%',
											}}
										></i>
									)}
								</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10).split('-').reverse().join('-')
									) : (
										<i
											className='fas fa-times'
											style={{
												color: 'red',
												textAlign: 'center',
												verticalAlign: 'center',
												display: 'inline-block',
												width: '100%',
											}}
										></i>
									)}
								</td>
								<td>${order.totalPrice}</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button className='btn-sm'>Details</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Fragment>
	)
}

export default OrdersListScreen
