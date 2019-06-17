import { put, takeLatest,call} from 'redux-saga/effects'
import { ActionTypes } from '../ActionTypes';
import axios from 'axios'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export  function* loginProcess(data){
    let contents=yield call(()=>axios.post(`http://poocha.herokuapp.com/users/login`,data.payload))
    if(contents.data.status===true){
      yield put({ type: ActionTypes.LOGIN_SUCCESS, payload: contents.data})
    }
     else
      yield put({ type: ActionTypes.LOGIN_FAILED})
  
}
  
export function* sagaLogin(){
    yield takeLatest(ActionTypes.LOGIN,loginProcess)
}

export  function* logoutProcess(data){
  let contents=yield call(()=>axios.get(`http://poocha.herokuapp.com/logout`))
  if(contents.data.status==="true"){
    yield put({ type: ActionTypes.LOGOUT_SUCCESS})
  }
   else
    yield put({ type: ActionTypes.LOGOUT_FAILED})

}

export function* sagaLogout(){
  yield takeLatest(ActionTypes.LOGOUT,logoutProcess)
}


export  function* signupProcess(data){
  let contents=yield call(()=>axios.post(`http://poocha.herokuapp.com/users/register`,data.payload))
  if(contents.data.status===true)
    yield put({ type: ActionTypes.SIGNUP_SUCCESS, payload: contents.data})
  else
    yield put({ type: ActionTypes.SIGNUP_FAILED})

}

export function* sagaSignup(){
  yield takeLatest(ActionTypes.SIGNUP,signupProcess)
}