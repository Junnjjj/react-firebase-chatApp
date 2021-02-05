import {
    SET_CHATROOM
} from './types'

export function setCurrentChatRoom(chatRoom){
    return{
        type: SET_CHATROOM,
        payload: chatRoom
    }
}

