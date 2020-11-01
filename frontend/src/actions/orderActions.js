import {
	ORDER_CREATE_FAIL,
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_DETAILS_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_LIST_FAIL,
	ORDER_LIST_REQUEST,
	ORDER_LIST_SUCCESS,
	ORDER_MY_LIST_FAIL,
	ORDER_MY_LIST_REQUEST,
	ORDER_MY_LIST_SUCCESS,
	ORDER_PAY_FAIL,
	ORDER_PAY_REQUEST,
	ORDER_PAY_SUCCESS,
	ORDER_SHIP_FAIL,
	ORDER_SHIP_REQUEST,
	ORDER_SHIP_SUCCESS,
} from '../constants/orderConstants'

import axios from 'axios'

export const createOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_CREATE_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		console.log('hi')
		const { data } = await axios.post(`/api/orders`, order, config)
		console.log('hi2')

		dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getOrderById = (id) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_DETAILS_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		console.log('hi')
		const { data } = await axios.get(`/api/orders/${id}`, config)
		console.log('hi2')

		dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const payOrder = (orderId, paymentResult) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: ORDER_PAY_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		console.log('hi')
		const { data } = await axios.put(
			`/api/orders/${orderId}/pay`,
			paymentResult,
			config
		)
		console.log('hi2')

		dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: ORDER_PAY_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getMyOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_MY_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		console.log('hi')
		const { data } = await axios.get(`/api/orders/myorders`, config)
		console.log('hi2')

		dispatch({ type: ORDER_MY_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: ORDER_MY_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const shipOrder = (order) => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_SHIP_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		console.log('hi')
		const { data } = await axios.put(
			`/api/orders/${order._id}/ship`,
			{},
			config
		)
		console.log('hi2')

		dispatch({ type: ORDER_SHIP_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: ORDER_SHIP_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const getOrders = () => async (dispatch, getState) => {
	try {
		dispatch({ type: ORDER_LIST_REQUEST })

		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		console.log('hi')
		const { data } = await axios.get(`/api/orders`, config)
		console.log('hi2')

		dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
	} catch (error) {
		dispatch({
			type: ORDER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
