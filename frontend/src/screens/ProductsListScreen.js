import React, { useEffect, Fragment } from 'react'
import { Table, Button, Alert, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Paginate from '../components/Paginate'
import {
	createProduct,
	deleteProduct,
	listProducts,
} from '../actions/productActions'
import { Loader } from '../components/Loader'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductsListScreen = ({ history, match }) => {
	const productList = useSelector((state) => state.productList)
	const { loading, error, products, pages, page } = productList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const productDelete = useSelector((state) => state.productDelete)
	const { loading: deleteLoading, error: deleteError, success } = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: createLoading,
		error: createError,
		success: createSuccess,
		product,
	} = productCreate

	const pageNumber = match.params.pageNumber
	const dispatch = useDispatch()
	useEffect(() => {
		if (!userInfo) {
			history.push('/login')
		}
		if (userInfo) {
			if (!userInfo.isAdmin) history.push('/login')
			else {
				if (createSuccess) {
					dispatch({ type: PRODUCT_CREATE_RESET })
					history.push(`/admin/product/${product._id}/edit`)
				} else dispatch(listProducts('', pageNumber))
			}
		}
	}, [dispatch, userInfo, history, success, createSuccess, pageNumber])

	const deleteHandler = (id) => {
		console.log('delete')
		//if(window.confirm('Are you sure')) if i want a pop up confirmation window
		dispatch(deleteProduct(id))
	}

	const productCreateHandler = () => {
		dispatch(createProduct())
	}
	return (
		<Fragment>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>

				<Col className='text-right'>
					<Button className='my-3' onClick={productCreateHandler}>
						<i className='fas fa-plus'></i> Create Product
					</Button>
				</Col>
			</Row>
			{deleteLoading && <Loader />}
			{deleteError && <Alert variant='danger'>{error}</Alert>}

			{loading ? (
				<Loader />
			) : error ? (
				<Alert variant='danger'>{error}</Alert>
			) : (
				<>
					<Table hover bordered striped responsive className='table-sm'>
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>price</th>
								<th>category</th>
								<th>brand</th>
							</tr>
						</thead>
						<tbody>
							{products.map((product) => (
								<tr key={product._id}>
									<td>{product._id}</td>
									<td>{product.name}</td>
									<td>${product.price}</td>
									<td>{product.category}</td>
									<td>{product.brand}</td>
									<td>
										<LinkContainer to={`/admin/product/${product._id}/edit`}>
											<Button variant='light' className='btn-sm'>
												<i className='fas fa-edit '></i>
											</Button>
										</LinkContainer>
										<Button
											variant='danger'
											className='btn-sm'
											onClick={() => deleteHandler(product._id)}
										>
											<i className='fas fa-trash '></i>
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
					<Paginate page={page} pages={pages} keyword='' isAdmin={true} />
				</>
			)}
		</Fragment>
	)
}

export default ProductsListScreen
