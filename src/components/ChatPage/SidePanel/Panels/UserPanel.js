import React, { useRef } from 'react'
import firebase from '../../../../firebase'
import { useSelector, useDispatch } from 'react-redux'

import { Dropdown, Image } from 'react-bootstrap'
import { setPhotoURL } from '../../../../redux/actions/user_actions'

function UserPanel() {

    const user = useSelector(state => state.user.currentUser)
    const inputOpenImageRef = useRef()
    const dispatch = useDispatch()

    const Logout = () => {
        firebase.auth().signOut()        
    }

    // 프로필 사진 변경 -> click 시 useRef 선택
    const handleOpenImageRef = () => {
        inputOpenImageRef.current.click();
    }

    //프로필 사진 변경 -> 실질적 변경 부분
    const handleuploadimage = async (event) => {
        const file = event.target.files[0]

        if(!file) return;
        const metadata = file.type

        try {
            //firebase에 업로드
            let uploadDataSnapshot = await firebase.storage().ref()
                .child(`user_image/${user.uid}`)
                .put(file, metadata)
            
            let downloadURL = await uploadDataSnapshot.ref.getDownloadURL()
            
            //firebase Auth 에서 이미지 수정
            await firebase.auth().currentUser.updateProfile({
                photoURL: downloadURL
            })
    
            //redux store 에서 유저 이미지 교체
            dispatch(setPhotoURL(downloadURL))
    
            //firebase database 수정
            await firebase.database().ref("users")
                .child(user.uid)
                .update({ image: downloadURL })            
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div style= {{display: 'flex', marginBottom: '1rem'}}>
            
            <Image src={user && user.photoURL} roundedCircle style={{width: '40px', height: '40px'}}/>               

            <Dropdown>
                <Dropdown.Toggle style ={{ color: 'black', background: 'transparent', border: '0px'}}>     
                    {user && user.displayName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item onClick={handleOpenImageRef}>프로필사진 변경</Dropdown.Item>                    
                    <Dropdown.Item href="/user">유저정보</Dropdown.Item>
                    <Dropdown.Item onClick={Logout}>로그아웃</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <input 
                type= "file"
                accept= "image/jpeg image/png"
                ref = {inputOpenImageRef}        
                style={{ display: 'none'}}
                onChange = {handleuploadimage}
            />
        </div>
    )
}

export default UserPanel
