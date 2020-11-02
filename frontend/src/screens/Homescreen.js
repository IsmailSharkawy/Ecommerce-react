import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product'
import { Loader } from '../components/Loader'
import { Link } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'
import TopCarousel from '../components/TopCarousel'

const Homescreen = ({ match }) => {
	const dispatch = useDispatch()
	const keyword = match.params.keyword
	const pageNumber = match.params.pageNumber
	const productList = useSelector((state) => state.productList)
	const { error, loading, products, pages, page } = productList
	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])
	// const products = [];
	return (
		<>
			{!keyword ? (
				<>
					<h1>Top products</h1> <TopCarousel />
				</>
			) : (
				<Link to='/' className='btn btn-light'>
					Go Back
				</Link>
			)}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<h3>{error}</h3>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						keyword={keyword ? keyword : ''}
						page={page}
						pages={pages}
					/>
				</>
			)}
		</>
	)
}

export default Homescreen
