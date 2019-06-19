import { put, takeLatest,call} from 'redux-saga/effects'
import { ActionTypes } from '../ActionTypes';
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'true';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Origin'] = 'true';

export  function* createSheet(data){
    let contents=yield call(()=>axios.post(`http://poocha.herokuapp.com/sheets/create`))
    if(contents.data.status===true){
        yield put({ type: ActionTypes.SHEET_CREATION_SUCCESS})
    }
     else
        yield put({ type: ActionTypes.SHEET_CREATION_FAILED})
  
  }
  
export function* sagaCreateSheet(){
    yield takeLatest(ActionTypes.CREATE_SHEET,createSheet)
}


export  function* getSheet(data){
    let contents=yield call(()=>axios.get(`http://poocha.herokuapp.com/sheets?sheet=${data.payload.id}`))
    if(contents.data.status===true){
        yield put({ type: ActionTypes.GET_SHEETDATA_SUCCESS ,payload:contents.data})
    }
     else
        yield put({ type: ActionTypes.GET_SHEETDATA_FAILED})
  
  }
  
export function* sagaGetSheet(){
    yield takeLatest(ActionTypes.GET_SHEETDATA,getSheet)
}
