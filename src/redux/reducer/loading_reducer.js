import {
    SET_LOADING
} from '../actions/types'


const initialLoadingState = {
    isLoading: true
}

export default function (state = initialLoadingState, action){
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
    
        default:
            return state;
    }
}