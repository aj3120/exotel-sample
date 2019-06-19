import {ActionTypes} from '../ActionTypes'
import { faGlasses } from '@fortawesome/free-solid-svg-icons';
const initial_state={
    loggedInStatus:false,
    login_loader:false,
    login_error:false,
    signup_success:false,
    signup_loader:false,
    signup_error:false,
    spreadsheet_array:[]
}
export default function(state=initial_state,action){
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,login_loader:true,username:action.payload.username,password:action.payload.password})
        case ActionTypes.LOGIN_SUCCESS:
            return({...state,loggedInStatus:true,login_loader:false,login_error:false,spreadsheet_array:action.payload.data}) 
        case ActionTypes.LOGIN_FAILED:
            return({login_loader:false,login_error:true})  
        case ActionTypes.LOGOUT:
            return({...state,login_loader:true})
        case ActionTypes.LOGOUT_SUCCESS:
            return({...state,loggedInStatus:false,login_loader:false})       
        case ActionTypes.SIGNUP:
            return {...state,signup_loader:true}
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state,signup_success:true,signup_loader:faGlasses,signup_error:false}          
        case ActionTypes.SIGNUP_FAILED:
            return({signup_loader:false,signup_error:true})  
        case ActionTypes.SHEET_CREATION_SUCCESS:
            return({...state,spreadsheet_array:[...state.spreadsheet_array,{_id:action.payload}]})        
        default:
            return state    
    }
}