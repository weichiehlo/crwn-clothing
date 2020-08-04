import ShopActionTypes from './shop.types';

const INITIAL_STATE = {
    'collections': null,
    'isFetching': false,
    'errorMessage': undefined
}

const shopReducer = (state=INITIAL_STATE,action)=>{
    switch(action.type){

        case ShopActionTypes.FETCH_COLLECTION_START:
            return {
                ...state,
                isFatching: true
            }
        case ShopActionTypes.FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                isFatching: false,
                collections:action.payload
            }
        case ShopActionTypes.FETCH_COLLECTION_FAILURE:
            return {
                ...state,
                isFatching: false,
                errorMessage:action.payload
            }

        default: return state
    }
}

export default shopReducer