import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
import { register } from '../actions/userActions'
import { Loader } from '../components/Loader'
export const RegisterScreen = ({ location, history }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [message, setMessage] = useState('')

	const dispatch = useDispatch()
	const redirect = location.search ? location.search.split('=')[1] : '/'

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [redirect, userInfo, history])

	const submitHandler = (e) => {
		e.preventDefault()
		if (password !== confirmPassword) {
			setMessage('Passwords do not match')
		} else dispatch(register(name, email, password))
	}
	return (
		<FormContainer>
			<h1>Sign in:</h1>
			{message !== '' ? <Alert>{message}</Alert> : null}
			{error && <Alert variant='danger'>{error}</Alert>}
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
					Register
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					Arleady have an account?{' '}
					<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
						Sign in
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}
