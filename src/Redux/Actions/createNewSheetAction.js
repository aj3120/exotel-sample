import {ActionTypes} from '../ActionTypes'
export const createNewSheetAction=(data)=>{
    return(
        {
            type:ActionTypes.CREATE_SHEET,
            payload:data
        }
    );
}