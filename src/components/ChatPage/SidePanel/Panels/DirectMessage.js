import React, {useState, useRef} from 'react'

import { Button , Collapse } from 'react-bootstrap'

function DirectMessage() {

    const [open, setOpen] = useState(false)
    const DMRef = useRef();

    const DMhandleOpenRef = () => {
        DMRef.current.click();
    }

    return (
        <div>

            <div onClick={DMhandleOpenRef} >
            DirectMessage Page                
            </div>

                <Collapse in={open}>
                    <div id="DirectMessage">        
                        
                        디엠 유저들이 출력

                    </div>
                </Collapse>
                

                <button
                        onClick={() => setOpen(!open)}
                        aria-controls="DirectMessage"
                        aria-expanded={open}
                        ref = {DMRef}
                        style ={{ display: 'none'}}
                />
        </div>
    )
}

export default DirectMessage
