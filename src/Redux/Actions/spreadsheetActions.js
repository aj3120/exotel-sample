import {ActionTypes} from '../ActionTypes';

export const getSheetDataAction=(data)=>{
    return(
        {
            type:ActionTypes.GET_SHEETDATA,
            payload:data

        }
    );
}

export const selectFieldAction=(data)=>{
    return(
        {
            type:ActionTypes.SELECT_FIELD,
            payload:data

        }
    );
}

export const addLeftColumnAction=(data)=>{
    return(
        {
            type:ActionTypes.ADD_LEFT_COLUMN,
            payload:data

        }
    );
}

export const addRightColumnAction=(data)=>{
    return(
        {
            type:ActionTypes.ADD_RIGHT_COLUMN,
            payload:data

        }
    );
}

export const sortAtoZAction=(data)=>{
    return(
        {
            type:ActionTypes.SORT_ATOZ,
            payload:data

        }
    );
}

export const sortZtoAAction=(data)=>{
    return(
        {
            type:ActionTypes.SORT_ZTOA,
            payload:data

        }
    );
}

export const cellChangeAction=(data)=>{
    return(
        {
            type:ActionTypes.CELL_CHANGE,
            payload:data

        }
    );
}

export const addRowsAction=(data)=>{
    return(
        {
            type:ActionTypes.ROWS_ADDED,
            payload:data

        }
    );
}
export const addRowCountAction=(data)=>{
    return(
        {
            type:ActionTypes.ROW_COUNT_CHANGE,
            payload:data

        }
    );
}

export const clearColumnAction=(data)=>{
    return(
        {
            type:ActionTypes.CLEAR_COLUMN,
            payload:data

        }
    );
}