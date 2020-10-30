import React, { useEffect, Fragment } from 'react'
import { Table, Button, Alert } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers, deleteUser } from '../actions/userActions'
import { Loader } from '../components/Loader'

const UsersListScreen = ({ history }) => {
	const usersList = useSelector((state) => state.usersList)
	const { loading, error, users } = usersList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userDelete = useSelector((state) => state.deleteUser)
	const { success: deleteSuccess } = userDelete

	const dispatch = useDispatch()
	useEffect(() => {
		if (userInfo && userInfo.isAdmin) dispatch(getUsers())
		else {
			history.push('/login')
		}
	}, [dispatch, userInfo, history, deleteSuccess])

	const deleteHandler = (id) => {
		//if(window.confirm('Are you sure')) if i want a pop up confirmation window
		dispatch(deleteUser(id))
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
							<th>Name</th>
							<th>email</th>
							<th>admin</th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a mailto={`${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit '></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler(user._id)}
									>
										<i className='fas fa-trash '></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Fragment>
	)
}

export default UsersListScreen
