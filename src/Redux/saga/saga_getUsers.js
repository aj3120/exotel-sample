import { put, takeLatest,call} from 'redux-saga/effects'
import { ActionTypes } from '../ActionTypes';
import axios from 'axios'

var config = {
    headers: {'Access-Control-Allow-Origin': '*'},
    crossdomain: true
};

export  function* userDetailsCall(){
    let contents=yield call(()=>axios.get(`https://poocha.herokuapp.com/users?action=poocha`,config))
    yield put({ type: ActionTypes.GET_USERS_SUCCESS, payload: contents.data})
  
  }
  
export function* sagaGetUsers(){
    yield takeLatest(ActionTypes.GET_USERS,userDetailsCall)
}
