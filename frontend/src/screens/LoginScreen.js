import React, { useState, useEffect } from 'react'
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import FormContainer from '../components/FormContainer.js'
import { login } from '../actions/userActions'
import { Loader } from '../components/Loader'
export const LoginScreen = ({ location, history }) => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const dispatch = useDispatch()
	const redirect = location.search ? location.search.split('=')[1] : '/'

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	useEffect(() => {
		if (userInfo) {
			history.push(redirect)
		}
	}, [redirect, userInfo, history])

	const submitHandler = (e) => {
		e.preventDefault()
		console.log(email)
		console.log(password)

		dispatch(login(email, password))
	}
	return (
		<FormContainer>
			<h1>Sign in:</h1>
			{error && <Alert variant='danger'>{error}</Alert>}
			{loading && <Loader />}

			<Form onSubmit={submitHandler}>
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
				<Button type='submit' variant='primary'>
					Sign In
				</Button>
			</Form>

			<Row className='py-3'>
				<Col>
					New Customer?{' '}
					<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}
