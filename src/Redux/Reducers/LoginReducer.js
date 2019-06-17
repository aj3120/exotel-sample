import {ActionTypes} from '../ActionTypes'
const initial_state={
    loggedInStatus:false,
    login_initiate:false
}
export default function(state=initial_state,action){
    switch(action.type){
        case ActionTypes.LOGIN:
            return({...state,login_initiate:true})
        case ActionTypes.LOGIN_SUCCESS:
            return({...state,loggedInStatus:true})  
        case ActionTypes.SIGNUP:
            return {...state,signup_initiate:true}
        case ActionTypes.SIGNUP_SUCCESS:
            return {...state,signup_success:true}          
        default:
            return state    
    }
}