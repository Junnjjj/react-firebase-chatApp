import React, {useState, useRef} from 'react'

import UserPanel from './Panels/UserPanel'
import Favorite from './Panels/Favorite'
import ChatRooms from './Panels/ChatRooms'
import DirectMessage from './Panels/DirectMessage'

function SidePanel() {

    return (
        <div style= {{background : '#f2f2f2', padding: '2rem', minHeight: '100vh', minWidth: '275px'}}>

            
            <UserPanel />

            <Favorite />

            <ChatRooms />

            <DirectMessage />

        </div>
    )
}

export default SidePanel
