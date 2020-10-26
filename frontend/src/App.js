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

const App = () => {
	return (
		<Router>
			<Header />
			<main className='py-3'>
				<Container>
					<Route path='/' component={Homescreen} exact />
					{/* match.params?? */}
					<Route path='/product/:id' component={Productscreen} />
					<Route path='/login' component={LoginScreen} />
					<Route path='/profile' component={ProfileScreen} />

					<Route path='/register' component={RegisterScreen} />

					<Route path='/cart/:id?' component={Cartscreen} />
					{/* id is optional incase we go to cart page in general */}
				</Container>
			</main>
			<Footer />
		</Router>
	)
}

export default App
