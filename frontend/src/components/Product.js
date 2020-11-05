import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import './Products.css'
import { addToFavorites, removeFromFavorites } from '../actions/productActions'

const Product = ({ product }) => {
	const dispatch = useDispatch()

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	console.log(product.name.replace(/\s/g, ''))
	useEffect(() => {
		{
			if (userInfo)
				if (product)
					product.favoritedBy.includes(userInfo._id)
						? (document.querySelector(
								`#${product.name.replace(/\s/g, '')}`
						  ).innerText = 'UNFAVORITE')
						: (document.querySelector(
								`#${product.name.replace(/\s/g, '')}`
						  ).innerText = 'FAVORITE')
		}
	}, [product, dispatch])
	const submitHandler = () => {
		console.log(
			document.querySelector(`#${product.name.replace(/\s/g, '')}`).innerText
		)
		if (
			document.querySelector(`#${product.name.replace(/\s/g, '')}`)
				.innerText === 'UNFAVORITE'
		) {
			dispatch(removeFromFavorites(product._id, { id: userInfo._id }))
			document.querySelector(`#${product.name.replace(/\s/g, '')}`).innerText =
				'FAVORITE'
		} else if (
			document.querySelector(`#${product.name.replace(/\s/g, '')}`)
				.innerText === 'FAVORITE'
		) {
			dispatch(addToFavorites(product._id, { id: userInfo._id }))
			document.querySelector(`#${product.name.replace(/\s/g, '')}`).innerText =
				'UNFAVORITE'
		}
	}

	return (
		<>
			<Card className='my-3 p-3 rounded' style={{ width: '110%' }}>
				<Link to={`/product/${product._id}`}>
					<Card.Img src={product.image} variant='top' />
				</Link>
				<Card.Body>
					<Link to={`/product/${product._id}`}>
						<Card.Title>
							<strong style={{ fontSize: '14px' }}>{product.name}</strong>
						</Card.Title>
					</Link>
					<Card.Text as='div'>
						<Rating
							value={product.rating}
							text={`${product.numReviews} reviews`}
						/>
					</Card.Text>
					<Card.Text as='h3'>${product.price}</Card.Text>
					<Button
						variant='outline-success'
						block
						style={{ margin: '0px', padding: '0px' }}
						onClick={submitHandler}
						id={product.name.replace(/\s/g, '')}
					>
						Favorite
					</Button>
				</Card.Body>
				{product.countInStock <= 0 ? (
					<Alert variant='danger'>Out of stock</Alert>
				) : (
					<>
						<br />
						<br />
						<br />
					</>
				)}
			</Card>
		</>
	)
}

export default Product
