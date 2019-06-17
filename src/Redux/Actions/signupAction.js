import {ActionTypes} from '../ActionTypes'
export const signupAction=(data)=>{
    return(
        {
            type:ActionTypes.SIGNUP,
            payload:data
        }
    );
}