import {ActionTypes} from '../ActionTypes'
const initial_state={
    spreadsheet_array:[]
}
export default function(state=initial_state,action){
    switch(action.type){
        case ActionTypes.GET_SPREADSHEETS:
            return({...state,spreadsheet_array:action.payload})     
        default:
            return state    
    }
}