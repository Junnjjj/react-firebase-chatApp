// redux 합쳐서 사용
import { combineReducers } from 'redux';
// 리듀서 import 
import user from './user_reducer'
import loading from './loading_reducer'
// import chatRoom from './chatRoom_reducer'

const rootReducer = combineReducers({
    user,
    loading
    // chatRoom
})

export default rootReducer;
