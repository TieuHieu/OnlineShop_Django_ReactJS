import {
    PRODUCT_LIST_REQUEST,
    PRODUC_LIST_SUCCESS,
    PRODUC_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUC_DETAILS_SUCCESS,
    PRODUC_DETAILS_FAIL,
} from '../constants/productConstants'



export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return { loading: true, products: [] }
        
        case PRODUC_LIST_SUCCESS:
            return { loading: false, products: action.payload }
        
        case PRODUC_LIST_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: {reviews: []}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return { loading: true, ...state }
        
        case PRODUC_DETAILS_SUCCESS:
            return { loading: false, product: action.payload }
        
        case PRODUC_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        
        default:
            return state
    }
}