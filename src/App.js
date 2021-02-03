import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import firebase from './firebase'
import Auth from './hoc/auth'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from './redux/actions/user_actions'

import Loading from './commons/components/Loading'
import ChatPage from './components/ChatPage/ChatPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/Loginpage/LoginPage'

function App() {

  let history = useHistory();
  let dispatch = useDispatch()

  
  const isLoading = useSelector(state => state.loading.isLoading)

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(user=>{
  //     console.log("user : ",user)
  //     // 로그인 된 상태이면
  //     if(user){
  //       history.push('/')
  //       dispatch(setUser(user))
  //     }else{
  //       history.push('/login')
  //     }
  //   })
  // }, [history])

  
  // if(isLoading){
  //   return(
  //       // Auth(Loading, true)        
  //     <div>
  //       <Loading />
  //     </div>
  //     )
  //   }else{
  //   }
    return (
    <Switch>
        <Route exact path="/" component={Auth(ChatPage, true)} />
        <Route exact path="/login" component={Auth(LoginPage, false)} />
        <Route exact path="/register" component={Auth(RegisterPage, false)} />
      </Switch>
  );

}

export default App;
