import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Loader } from '../components/Loader'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'

const Homescreen = () => {
	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { error, loading, products } = productList
	useEffect(() => {
		dispatch(listProducts())
	}, [dispatch])
	// const products = [];
	return (
		<>
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<h3>{error}</h3>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</>
	)
}

export default Homescreen
