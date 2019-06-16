import {ActionTypes} from '../ActionTypes'
export const getUserDetailsAction=()=>{
    return(
        {
            type:ActionTypes.GET_USERS,
        }
    );
}