import {
    CART_REQUEST,
    CART_SUCCESS,
    CART_FAIL,
    CART_ADD_REQUEST,
    CART_ADD_SUCCESS,
    CART_ADD_FAIL,
    CART_REMOVE_REQUEST,
    CART_REMOVE_SUCCESS,
    CART_REMOVE_FAIL,
    CART_UPDATE_REQUEST,
    CART_UPDATE_SUCCESS,
    CART_UPDATE_FAIL,
} from '../constants/index'

import axios from 'axios'

// get cart
export const getCart = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REQUEST
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get("/account/cart/", config)

        dispatch({
            type: CART_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// add to cart
export const addToCart = (product_id, quantity = 1) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_ADD_REQUEST
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post("/account/cart/add/", { product_id, quantity }, config)

        dispatch({
            type: CART_ADD_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_ADD_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}

// remove from cart
export const removeFromCart = (product_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CART_REMOVE_REQUEST })

        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post("/account/cart/remove/", { product_id }, config)

        dispatch({ type: CART_REMOVE_SUCCESS, payload: data })
        dispatch({ type: CART_SUCCESS, payload: data }) // ✅ sync with main reducer
    } catch (error) {
        dispatch({
            type: CART_REMOVE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
        })
    }
}


// update cart item
export const updateCartItem = (product_id, quantity) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_UPDATE_REQUEST
        })

        const {
            userLoginReducer: { userInfo },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post("/account/cart/update/", { product_id, quantity }, config)

        dispatch({
            type: CART_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CART_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message
        })
    }
}
