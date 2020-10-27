import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getPaymentMethod } from '../actions/cartActions.js'
import CheckoutSteps from '../components/CheckoutSteps.js'
import FormContainer from '../components/FormContainer.js'

const PaymentScreen = ({ history }) => {
	const cart = useSelector((state) => state.cart)

	const [paymentMethod, setPaymentMethod] = useState('PayPal')

	const dispatch = useDispatch()

	const submitHandler = () => {
		dispatch(getPaymentMethod(paymentMethod))
		history.push('/placeorder')
	}

	return (
		<FormContainer>
			<h1 className='py-4'>Payment Method:</h1>
			<CheckoutSteps step1 step2 step3 />
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'>Select Method</Form.Label>
				</Form.Group>
				<Col>
					<Form.Check
						type='radio'
						label='PayPal or Credit Card'
						value='PayPal'
						name='paymentMethod'
						id='PayPal'
						checked
						onChange={(e) => setPaymentMethod(e.target.value)}
						className='mb-4'
					></Form.Check>
					<Form.Check
						type='radio'
						label='Stripe'
						value='Stripe'
						name='paymentMethod'
						id='Stripe'
						onChange={(e) => setPaymentMethod(e.target.value)}
						className='mb-4'
					></Form.Check>
				</Col>
				<Button type='submit' variant='primary'>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
