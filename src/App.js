import React, { useEffect } from "react";
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import firebase from './firebase'
import { useDispatch, useSelector } from "react-redux"
import { setUser } from './redux/actions/user_actions'

import ChatPage from './components/ChatPage/ChatPage'
import RegisterPage from './components/RegisterPage/RegisterPage'
import LoginPage from './components/Loginpage/LoginPage'

function App() {

  let history = useHistory();
  let dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.isLoading)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user=>{
      console.log("user : ",user)
      // 로그인 된 상태이면
      if(user){
        history.push('/')
        dispatch(setUser(user))
      }else{
        history.push('/login')
      }
    })
  }, [history])


  if(isLoading){
    return(
      <div class="loader-container">
        <div class="loader"></div>
      </div>
    )
  }else{
    return (
        <Switch>
          <Route exact path="/" component={ChatPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
    );
  }

}

export default App;
