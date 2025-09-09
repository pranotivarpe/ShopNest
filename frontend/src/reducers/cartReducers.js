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

export const cartReducer = (state = { cart: { items: [] } }, action) => {
    switch (action.type) {
        case CART_REQUEST:
            return { ...state, loading: true, error: null }
        case CART_SUCCESS:
            return { ...state, loading: false, cart: action.payload, error: null }
        case CART_FAIL:
            return { ...state, loading: false, error: action.payload }

        // ✅ Update cart immediately on add/remove/update success
        case CART_ADD_SUCCESS:
        case CART_REMOVE_SUCCESS:
        case CART_UPDATE_SUCCESS:
            return { ...state, loading: false, cart: action.payload, error: null }

        default:
            return state
    }
}


export const cartAddReducer = (state = { cart: { items: [] } }, action) => {
    switch (action.type) {
        case CART_ADD_REQUEST:
            return { ...state, loading: true, error: null }
        case CART_ADD_SUCCESS:
            return { ...state, loading: false, cart: action.payload, error: null }
        case CART_ADD_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const cartRemoveReducer = (state = { cart: { items: [] } }, action) => {
    switch (action.type) {
        case CART_REMOVE_REQUEST:
            return { ...state, loading: true, error: null }
        case CART_REMOVE_SUCCESS:
            return { ...state, loading: false, cart: action.payload, error: null }
        case CART_REMOVE_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}

export const cartUpdateReducer = (state = { cart: { items: [] } }, action) => {
    switch (action.type) {
        case CART_UPDATE_REQUEST:
            return { ...state, loading: true, error: null }
        case CART_UPDATE_SUCCESS:
            return { ...state, loading: false, cart: action.payload, error: null }
        case CART_UPDATE_FAIL:
            return { ...state, loading: false, error: action.payload }
        default:
            return state
    }
}
