import { put, takeLatest,call} from 'redux-saga/effects'
import { ActionTypes } from '../ActionTypes';
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Credentials'] = 'true';
axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.get['Access-Control-Allow-Credentials'] = 'true';

export  function* createSheet(data){
    let contents=yield call(()=>axios.post(`http://poocha.herokuapp.com/sheets/create?user=${data.payload.user}`,{spread_data:[{index:1,A:'',B:'',C:''},{index:2,A:'',B:'',C:''},{index:3,A:'',B:'',C:''}],headers:[{label:'A',key:'A'},{label:'B',key:'B'},{label:'C',key:'C'}]}))
    if(contents.data.status==="true"){
        yield put({ type: ActionTypes.SHEET_CREATION_SUCCESS,payload:contents.data.data.sheetId})
        
    }
     else
        yield put({ type: ActionTypes.SHEET_CREATION_FAILED})
  
  }
  
export function* sagaCreateSheet(){
    yield takeLatest(ActionTypes.CREATE_SHEET,createSheet)
}


export  function* getSheet(data){
    let contents=yield call(()=>axios.get(`http://poocha.herokuapp.com/sheets?sheet=${data.payload.id}&user=${data.payload.user}`))
    if(contents.data.status===true){
        yield put({ type: ActionTypes.GET_SHEETDATA_SUCCESS ,payload:contents.data})
    }
     else
        yield put({ type: ActionTypes.GET_SHEETDATA_FAILED})
  
  }
  
export function* sagaGetSheet(){
    yield takeLatest(ActionTypes.GET_SHEETDATA,getSheet)
}

export  function* updateSheet(data){
    let contents=yield call(()=>axios.post(`http://poocha.herokuapp.com/sheets/create?sheet=${data.payload.id}&user=${data.payload.user}`,data.payload.data))
    if(contents.data.status==="true"){
        yield put({ type: ActionTypes.UPDATE_SHEETDATA_SUCCESS ,payload:contents.data})
    }
     else
        yield put({ type: ActionTypes.UPDATE_SHEETDATA_FAILED})
  
  }
  
export function* sagaUpdateSheet(){
    yield takeLatest(ActionTypes.UPDATE_SHEETDATA,updateSheet)
}