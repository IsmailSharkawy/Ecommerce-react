import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, userUpdateDetails } from '../actions/userActions'
import { Loader } from '../components/Loader'
export const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdate = useSelector((state) => state.userUpdate)
	const { success } = userUpdate

	useEffect(() => {
		console.log(user.name)
		if (!userInfo) {
			history.push('/login')
		} else {
			if (!user.name || user.name !== userInfo.name)
				dispatch(getUserDetails('profile'))
			else {
				setName(user.name)
				setEmail(user.email)
			}
		}
	}, [userInfo, history, user, dispatch])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else {
			dispatch(userUpdateDetails({ id: user._id, name, email, password }))
		}
	}
	return (
		<Row>
			<Col md={3}>
				<h1>User Profile:</h1>
				{message !== '' ? <Alert>{message}</Alert> : null}
				{error && <Alert variant='danger'>{error}</Alert>}
				{success && <Alert variant='success'>Profile updated.</Alert>}

				{loading && <Loader />}

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
					<Form.Group controlId='password'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Enter password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Form.Group controlId='confirmPassword'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Re-enter password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button type='submit' variant='primary'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h1>Orders:</h1>
			</Col>
		</Row>
	)
}
