import {
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_RESET,
	PRODUCT_CREATE_REVIEW_FAIL,
	PRODUCT_CREATE_REVIEW_REQUEST,
	PRODUCT_CREATE_REVIEW_RESET,
	PRODUCT_CREATE_REVIEW_SUCCESS,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_DELETE_FAIL,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_FROM_FAVORITES_FAIL,
	PRODUCT_FROM_FAVORITES_REQUEST,
	PRODUCT_FROM_FAVORITES_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	PRODUCT_TOP_FAIL,
	PRODUCT_TOP_REQUEST,
	PRODUCT_TOP_SUCCESS,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_RESET,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_GET_FAVORITES_REQUEST,
	PRODUCT_GET_FAVORITES_FAIL,
	PRODUCT_GET_FAVORITES_SUCCESS,
	PRODUCT_TO_FAVORITES_FAIL,
	PRODUCT_TO_FAVORITES_REQUEST,
	PRODUCT_TO_FAVORITES_SUCCESS,
	PRODUCT_FROM_FAVORITES_RESET,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { loading: true, products: [] }

		case PRODUCT_LIST_SUCCESS:
			return {
				products: action.payload.products,
				pages: action.payload.pages,
				page: action.payload.page,
				loading: false,
			}
		case PRODUCT_LIST_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const productDetailsReducer = (
	state = { product: { reviews: [] } },
	action
) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { loading: true, ...state }

		case PRODUCT_DETAILS_SUCCESS:
			return { product: action.payload, loading: false }
		case PRODUCT_DETAILS_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const productDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_DELETE_REQUEST:
			return { loading: true }

		case PRODUCT_DELETE_SUCCESS:
			return { success: true, loading: false }
		case PRODUCT_DELETE_FAIL:
			return { loading: false, error: action.payload }
		default:
			return state
	}
}

export const productCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REQUEST:
			return { loading: true }

		case PRODUCT_CREATE_SUCCESS:
			return { success: true, loading: false, product: action.payload }
		case PRODUCT_CREATE_FAIL:
			return { loading: false, error: action.payload }
		case PRODUCT_CREATE_RESET:
			return {}
		default:
			return state
	}
}

export const productUpdateReducer = (state = { product: {} }, action) => {
	switch (action.type) {
		case PRODUCT_UPDATE_REQUEST:
			return { loading: true }

		case PRODUCT_UPDATE_SUCCESS:
			return { success: true, loading: false }
		case PRODUCT_UPDATE_FAIL:
			return { loading: false, error: action.payload }
		case PRODUCT_UPDATE_RESET:
			return { product: {} }
		default:
			return state
	}
}

export const createReviewReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_CREATE_REVIEW_REQUEST:
			return { loading: true }

		case PRODUCT_CREATE_REVIEW_SUCCESS:
			return { success: true, loading: false }
		case PRODUCT_CREATE_REVIEW_FAIL:
			return { loading: false, error: action.payload }
		case PRODUCT_CREATE_REVIEW_RESET:
			return {}
		default:
			return state
	}
}

export const topProductsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case PRODUCT_TOP_REQUEST:
			return { loading: true, products: [] }

		case PRODUCT_TOP_SUCCESS:
			return { success: true, loading: false, products: action.payload }
		case PRODUCT_TOP_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const favoriteProductsAddReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_TO_FAVORITES_REQUEST:
			return { loading: true }

		case PRODUCT_TO_FAVORITES_SUCCESS:
			return { success: true, loading: false }
		case PRODUCT_TO_FAVORITES_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}

export const favoriteProductsRemoveReducer = (state = {}, action) => {
	switch (action.type) {
		case PRODUCT_FROM_FAVORITES_REQUEST:
			return { loading: true }

		case PRODUCT_FROM_FAVORITES_SUCCESS:
			return { success: true, loading: false }
		case PRODUCT_FROM_FAVORITES_FAIL:
			return { loading: false, error: action.payload }
		case PRODUCT_FROM_FAVORITES_RESET:
			return {}

		default:
			return state
	}
}

export const favoriteProductsGetReducer = (
	state = { products: [] },
	action
) => {
	switch (action.type) {
		case PRODUCT_GET_FAVORITES_REQUEST:
			return { loading: true, products: [] }

		case PRODUCT_GET_FAVORITES_SUCCESS:
			return { success: true, loading: false, products: action.payload }
		case PRODUCT_GET_FAVORITES_FAIL:
			return { loading: false, error: action.payload }

		default:
			return state
	}
}
