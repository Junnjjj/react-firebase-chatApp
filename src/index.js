import React from 'react';
import App from './App';
import "./index.css"
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
//리덕스 연결
import { Provider } from 'react-redux'


import 'bootstrap/dist/css/bootstrap.min.css';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk'
import Reducer from './redux/reducer/index'

//redux store 생성
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
  <React.StrictMode>
      <Provider store = {createStoreWithMiddleware(Reducer,
        window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
        )}>
        <Router>
            <App />
        </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
