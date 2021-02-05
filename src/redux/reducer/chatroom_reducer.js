import {
    SET_CHATROOM
} from '../actions/types'

const initialChatRoomState = {
    setCurrentChatRoom: null
}

export default function (state = initialChatRoomState, action){
    switch (action.type) {
        case SET_CHATROOM:
            return {
                ...state,
                setCurrentChatRoom : action.payload,
            }

        default:
            return state;
    }
}
