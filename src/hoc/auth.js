import React, { useEffect } from 'react'
import firebase from '../firebase'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from '../redux/actions/user_actions'
import { setLoading } from '../redux/actions/loading_actions'

import Loading from '../commons/components/Loading'

export default function(SpecificComponent, option, adminRoute = null){
    
    //null 아무나 출입 가능
    //true 로그인한 유저만 출입이 가능
    //false 로그인한 유저는 출입 불가능한 페이지

    function AuthenticationCheck(props){

        const dispatch = useDispatch()

        //firebase 에 request 날려서 현재 상태를 가져온다.
        useEffect(() => {                    
            firebase.auth().onAuthStateChanged(user=> {
                if(user){
                    // 로그인한 상태
                    dispatch(setUser(user))                    
                    
                    if(option === false){    
                        dispatch(setLoading(false))       
                        props.history.push('/')
                    }
                        
                }else{
                    //로그인 하지 않은 상태
                    if(option){
                        dispatch(setLoading(false))
                        props.history.push('/login')
                    }
                }
            })
        }, [])

        return(
            <SpecificComponent />
        )

    }
    return AuthenticationCheck
}
