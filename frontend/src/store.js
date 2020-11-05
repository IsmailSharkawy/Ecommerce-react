import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
	productListReducer,
	productDetailsReducer,
	productDeleteReducer,
	productCreateReducer,
	productUpdateReducer,
	createReviewReducer,
	topProductsReducer,
	favoriteProductsGetReducer,
	favoriteProductsRemoveReducer,
	favoriteProductsAddReducer,
} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import {
	deleteUserReducer,
	userDetailsReducer,
	userEditReducer,
	userLoginReducer,
	userRegisterReducer,
	usersInChatReducer,
	usersListReducer,
	userUpdateReducer,
} from './reducers/userReducers'
import {
	createOrderReducer,
	getOrderReducer,
	myOrdersReducer,
	orderPayReducer,
	orderShipReducer,
	ordersListReducer,
} from './reducers/orderReducers'

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userLogin: userLoginReducer,
	userRegister: userRegisterReducer,
	userDetails: userDetailsReducer,
	userUpdate: userUpdateReducer,
	createOrder: createOrderReducer,
	getOrder: getOrderReducer,
	orderPay: orderPayReducer,
	myOrders: myOrdersReducer,
	orderShip: orderShipReducer,
	usersList: usersListReducer,
	deleteUser: deleteUserReducer,
	userEdit: userEditReducer,
	productDelete: productDeleteReducer,
	productCreate: productCreateReducer,
	productUpdate: productUpdateReducer,
	ordersList: ordersListReducer,
	createReview: createReviewReducer,
	topProducts: topProductsReducer,
	usersInChat: usersInChatReducer,
	favoriteProductsGet: favoriteProductsGetReducer,
	favoriteProductsRemove: favoriteProductsRemoveReducer,
	favoriteProductsAdd: favoriteProductsAddReducer,
})
const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: []

const userInfoFromStorage = localStorage.getItem('userInfo')
	? JSON.parse(localStorage.getItem('userInfo'))
	: null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
	? JSON.parse(localStorage.getItem('shippingAddress'))
	: {}
const initialState = {
	cart: {
		cartItems: cartItemsFromStorage,
		shippingAddress: shippingAddressFromStorage,
	},
	userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
)

export default store
