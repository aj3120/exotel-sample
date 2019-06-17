import {ActionTypes} from '../ActionTypes'
export const createNewSheetAction=()=>{
    return(
        {
            type:ActionTypes.CREATE_SHEET,
        }
    );
}