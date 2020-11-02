import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
	const [keyword, setKeyword] = useState('')

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			history.push(`/search/${keyword}/page/1`)
		} else {
			history.push('/')
		}
	}
	return (
		<Form onSubmit={submitHandler} inline>
			<Form.Control
				type='text'
				name='box'
				onChange={(e) => setKeyword(e.target.value)}
				placeholder='Search products...'
			></Form.Control>

			<Button type='submit' variant='outline-success' className='p-2'>
				Search
			</Button>
		</Form>
	)
}

export default SearchBox
