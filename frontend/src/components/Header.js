import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'

import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'

const Header = () => {
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const dispatch = useDispatch()
	const logoutHandler = () => {
		dispatch(logout())
	}
	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
				<Container>
					<Navbar.Brand href='/'>LimitleShop</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						{userInfo && (
							<Nav className='mx-5'>
								<LinkContainer to='/contactus'>
									<Nav.Link className='px-4'>
										<i className='fas fa-phone-alt'></i> Contact Us
									</Nav.Link>
								</LinkContainer>
							</Nav>
						)}

						<Route
							render={({ match, history }) => <SearchBox history={history} />} //to pass history to search box as a prop
						/>
						<Nav className='ml-auto'>
							<LinkContainer to='/cart'>
								<Nav.Link className='px-4'>
									<i className='fas fa-shopping-cart'></i> Cart
								</Nav.Link>
							</LinkContainer>
							{userInfo && !userInfo.isAdmin && (
								<LinkContainer to='/favorites'>
									<Nav.Link className='mx-2'>
										<i className='fas fa-heart'></i> Favorites
									</Nav.Link>
								</LinkContainer>
							)}
							{userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login'>
									<Nav.Link>
										<i className='fas fa-user'></i> Sign In
									</Nav.Link>
								</LinkContainer>
							)}

							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<LinkContainer to='/admin/userslist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/productslist'>
										<NavDropdown.Item>Products</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/orderslist'>
										<NavDropdown.Item>Orders</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/live'>
										<NavDropdown.Item>Live Assist</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	)
}

export default Header
