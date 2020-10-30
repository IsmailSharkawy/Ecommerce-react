import React, { useState, useEffect } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails, userEditDetails } from '../actions/userActions.js'
import FormContainer from '../components/FormContainer.js'
import { Loader } from '../components/Loader'
import { USER_EDIT_RESET } from '../constants/userConstants.js'

export const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()
	// const redirect = location.search ? location.search.split('=')[1] : '/'

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userEdit = useSelector((state) => state.userEdit)
	const { loading: editLoading, error: editError, success } = userEdit

	useEffect(() => {
		if (success) {
			dispatch({ type: USER_EDIT_RESET })
			history.push('/admin/userslist')
		} else {
			if (!user.name || user._id != userId) dispatch(getUserDetails(userId))
			else {
				setName(user.name)
				setEmail(user.email)
				setIsAdmin(user.isAdmin)
			}
		}
	}, [dispatch, user, userId, history])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(userEditDetails({ _id: userId, name, email, isAdmin }))
	}
	return (
		<>
			<Link to='/admin/userslist' className='btn btn-light my-3'>
				Go back
			</Link>

			<FormContainer>
				<h1>Edit User:</h1>

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
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<Form.Group controlId='isadmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin'
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
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
