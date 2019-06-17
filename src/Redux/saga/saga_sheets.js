import { put, takeLatest,call} from 'redux-saga/effects'
import { ActionTypes } from '../ActionTypes';
import axios from 'axios'
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';

export  function* createSheet(data){
    let contents=yield call(()=>axios.post(`http://poocha.herokuapp.com/sheets/create`))
    if(contents.data.status===true){
        yield put({ type: ActionTypes.SHEET_CREATION_SUCCESS})
    }
     else
        yield put({ type: ActionTypes.SHEET_CREATION_FAILED})
  
  }
  
export function* sagaSheet(){
    yield takeLatest(ActionTypes.CREATE_SHEET,createSheet)
}
