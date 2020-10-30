import React from 'react'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Homescreen from './screens/Homescreen'
import Productscreen from './screens/Productscreen'
import { Cartscreen } from './screens/Cartscreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import { ProfileScreen } from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrder from './screens/PlaceOrder'
import OrdersScreen from './screens/OrdersScreen'
import UsersListScreen from './screens/UsersListScreen'
import { UserEditScreen } from './screens/UserEditScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/order/:id' component={OrdersScreen} />
					<Route path='/payment' component={PaymentScreen} />
					<Route path='/placeorder' component={PlaceOrder} />
					<Route path='/shipping' component={ShippingScreen} />
					<Route path='/profile' component={ProfileScreen} />

					<Route path='/' component={Homescreen} exact />
					<Route path='/product/:id' component={Productscreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/register' component={RegisterScreen} />
					<Route path='/cart/:id?' component={Cartscreen} />
					{/* id is optional incase we go to cart page in general */}
					<Route path='/admin/userslist' component={UsersListScreen} />
					<Route path='/admin/user/:id/edit' component={UserEditScreen} />
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
