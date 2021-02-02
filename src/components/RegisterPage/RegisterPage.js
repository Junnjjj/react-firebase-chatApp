import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import firebase from "../../firebase"

import { Link } from "react-router-dom"
import LoginPage from '../Loginpage/LoginPage';

function RegisterPage() {

    const { register, handleSubmit, watch, errors } = useForm();

    const [errorFromSubmit, seterrorFromSubmit] = useState("")
    const [Loading, setLoading] = useState(false)

    //react-hook-form 에선 State 이 아닌 useRef 를 통해 비교
    // 특정 Dom 을 선택하기 위해 사용
    const password = useRef()
    password.current = watch("password");

   const onSubmit = async (data) => {
        try {
            setLoading(true)
            // firebase auth 로 아이디 생성
            let createdUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            await firebase.auth().updateCurrentUser({
                displayName: data.name,
                photoURL: `/images/Image.png`
            })
            //realtime database 에 저장
            await firebase.database().ref("users").child(createdUser.user.uid).set({
                name: createdUser.user.displayName,
                image: createdUser.user.photoURL
            })
            
            console.log(createdUser)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            seterrorFromSubmit(error.message)
            setTimeout(() => {
                seterrorFromSubmit("")
            }, 5000);
        }
   }

    return (

        <div class ="auth-wrapper">
            <h2 style = {{ textAlign: 'center'}}>회원가입</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>이메일</label>
                <input 
                    name= "email" 
                    type = "email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
                />
                {errors.email && errors.email.type === "required" && <p>이메일 항목 칸을 입력하셔야 합니다.</p>}
                {errors.email && errors.email.type === "pattern" && <p>이메일 형식이 올바르지 않습니다.</p>}

                <label>이름</label>
                <input
                    name="name"
                    ref={register({ required: true, maxLength: 10 })}
                />
                {errors.name && errors.name.type === "required" && <p>이름 항목 칸을 입력하셔야 합니다.</p>}
                {errors.name && errors.name.type === "maxLength" && <p>이름은 10자 를 넘어갈 수 없습니다.</p>}

                <label>비밀번호</label>
                <input 
                    name = "password"
                    type = "password"
                    ref = {register({ required: true, minLength: 6})}
                />
                {errors.password && errors.password.type === "required" && <p>비밀번호 항목 칸을 입력하셔야 합니다.</p>}
                {errors.password && errors.password.type === "minLength" && <p>비밀번호는 6자리 이상 이어야 합니다.</p>}

                <label>비밀번호 확인</label>
                <input 
                    name = "passwordConfirm"
                    type = "password"
                    ref = {register({ required: true, validate: (value) => value === password.current})}
                />
                {errors.passwordConfirm && errors.passwordConfirm.type === "required" && <p>비밀번호 확인 항목 칸을 입력하셔야 합니다.</p>}
                {errors.passwordConfirm && errors.passwordConfirm.type === "validate" && <p>비밀 번호가 동일 하지 않습니다..</p>}

                <input type="submit" disabled={Loading}/>
            <Link style={{ color : 'gray', textDecoration:'none' }} to="login">이미 아이디가 있다면 ...</Link>
            
                {errorFromSubmit && 
                    <p>{errorFromSubmit}</p>
                }

            </form>
        </div>
    )
}

export default RegisterPage
