import React, { useEffect, Fragment } from 'react'
import { Table, Button, Alert, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Paginate from '../components/Paginate'
import { getUsersInChat } from '../actions/userActions'
import { Loader } from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const UsersInLive = ({ history, match }) => {
	const usersInChat = useSelector((state) => state.usersInChat)
	const { users, loading, error } = usersInChat

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const pageNumber = match.params.pageNumber
	const dispatch = useDispatch()
	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}
		if (userInfo) {
			if (!userInfo.isAdmin) history.push('/login')
			// else {
			// 	if (createSuccess) {
			// 		dispatch({ type: PRODUCT_CREATE_RESET })
			// 		history.push(`/admin/product/${product._id}/edit`)
			// 	}
			else {
				dispatch(getUsersInChat())
			}
		}
	}, [dispatch, userInfo, history])

	return (
		<Fragment>
			<Row className='align-items-center'>
				<Col>
					<h1>Users:</h1>
				</Col>
			</Row>

			{loading ? (
				<Loader />
			) : error ? (
				<Alert variant='danger'>{error}</Alert>
			) : (
				<>
					<Table hover bordered striped responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Assist</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user._id}>
									<td>{user._id}</td>
									<td>{user.name}</td>

									<td>
										<LinkContainer to={`/livesupport/${user._id}`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-hands-helping fa-3x'></i>
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					{/* <Paginate page={page} pages={pages} keyword='' isAdmin={true} /> */}
				</>
			)}
		</Fragment>
	)
}

export default UsersInLive
