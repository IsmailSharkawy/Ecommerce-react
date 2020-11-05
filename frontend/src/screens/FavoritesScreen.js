import React, { useEffect, Fragment } from 'react'
import { Table, Button, Alert, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Paginate from '../components/Paginate'
import {
	createProduct,
	deleteProduct,
	getFromFavorites,
	listProducts,
	removeFromFavorites,
} from '../actions/productActions'
import { Loader } from '../components/Loader'
import {
	PRODUCT_CREATE_RESET,
	PRODUCT_FROM_FAVORITES_RESET,
} from '../constants/productConstants'

const FavoritesScreen = ({ history, match }) => {
	const favoriteProductsGet = useSelector((state) => state.favoriteProductsGet)
	const { loading, error, products } = favoriteProductsGet

	const favoriteProductsRemove = useSelector(
		(state) => state.favoriteProductsRemove
	)
	const { success } = favoriteProductsRemove

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const pageNumber = match.params.pageNumber
	const dispatch = useDispatch()
	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}
		if (userInfo) {
			dispatch(getFromFavorites(userInfo._id))
		}
	}, [dispatch, userInfo, history, success])

	const deleteHandler = (productId, userId) => {
		//if(window.confirm('Are you sure')) if i want a pop up confirmation window
		dispatch(removeFromFavorites(productId, userId))
	}

	return (
		<Fragment>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
			</Row>

			{loading ? (
				<Loader />
			) : error ? (
				<Alert variant='danger'>{error}</Alert>
			) : (
				<>
					<Table hover bordered striped responsive className='table-sm'>
						<thead>
							<tr>
								<th>Name</th>
								<th>price</th>
								<th>category</th>
								<th>brand</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>{product.description}</td>
									<td>
										<LinkContainer to={`/product/${product._id}`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit '></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() =>
												deleteHandler(product._id, { id: userInfo._id })
											}
										>
											<i className='fas fa-trash '></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				</>
			)}
		</Fragment>
	)
}

export default FavoritesScreen
