import React, { useRef, useState } from 'react'
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"
import firebase from "../../firebase"


function LoginPage() {

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
            // firebase auth 로 로그인
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            
            
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

        <div className ="auth-wrapper">
            <h2 style = {{ textAlign: 'center'}}>로그인</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>이메일</label>
                <input 
                    name= "email" 
                    type = "email"
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })} 
                />
                {errors.email && errors.email.type === "required" && <p>이메일 항목 칸을 입력하셔야 합니다.</p>}
                {errors.email && errors.email.type === "pattern" && <p>이메일 형식이 올바르지 않습니다.</p>}

                <label>비밀번호</label>
                <input 
                    name = "password"
                    type = "password"
                    ref = {register({ required: true, minLength: 6})}
                />
                {errors.password && errors.password.type === "required" && <p>비밀번호 항목 칸을 입력하셔야 합니다.</p>}
                {errors.password && errors.password.type === "minLength" && <p>비밀번호는 6자리 이상 이어야 합니다.</p>}

                <input type="submit" disabled={Loading}/>
                <Link style={{ color : 'gray', textDecoration:'none' }} to="register">회원 가입을 원하시면 </Link>
            
                {errorFromSubmit && 
                    <p>{errorFromSubmit}</p>
                }
            
            </form>
        </div>
    )
}

export default LoginPage
