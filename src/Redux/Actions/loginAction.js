import {ActionTypes} from '../ActionTypes'
export const loginAction=(data)=>{
    return(
        {
            type:ActionTypes.LOGIN,
            payload:data
        }
    );
}