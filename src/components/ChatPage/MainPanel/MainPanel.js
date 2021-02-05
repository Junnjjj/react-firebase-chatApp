import React from 'react'

import MessageHeader from './Panels/MessageHeader'
import Message from './Panels/Message'
import MessageForm from './Panels/MessageForm'

function MainPanel() {
    return (

        <div style = {{ padding: '2rem 2rem 0 2rem'}}>
            
            <MessageHeader />

            <Message />

            <MessageForm />

        </div>
    )
}

export default MainPanel
