import {
    SET_LOADING
} from './types'

export function setLoading(loading){
    return{
        type: SET_LOADING,
        payload: loading
    }
}