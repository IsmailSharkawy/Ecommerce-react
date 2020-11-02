import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Carousel, Image, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Loader } from './Loader'
import { getTopProducts } from '../actions/productActions'

const TopCarousel = () => {
	const dispatch = useDispatch()

	const topProducts = useSelector((state) => state.topProducts)
	const { products, loading, error } = topProducts

	useEffect(() => {
		dispatch(getTopProducts())
	}, [dispatch])

	return loading ? (
		<Loader />
	) : error ? (
		<Alert variant='danger'>{error}</Alert>
	) : (
		<Carousel pause='hover' className='bg-dark '>
			{products.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`} className='link'>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className='carousel-caption'>
							<h4>
								{product.name} (${product.price})
							</h4>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	)
}

export default TopCarousel
