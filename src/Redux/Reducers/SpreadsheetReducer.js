import {ActionTypes} from '../ActionTypes'

const initial_state={
    spread_data: [
        { index: 1, A: 'FHello', B: 'EHai', C: 'GHowareyou' },
        { index: 2, A: 'DHello', B: 'FHai', C: 'GHowareyou' },
        { index: 3, A: 'CHello', B: 'SHai', C: 'sHowareyou' },
        { index: 4, A: 'BHello', B: 'AHai', C: 'WHowareyou' },
    ],
    headers: [
        { label: "A", key: "A" },
        { label: "B", key: "B" },
        { label: "C", key: "C" }
    ],
    add_row_count: 1,
    field_selected: ' '
}
export default function(state=initial_state,action){
    switch(action.type){
        case ActionTypes.GET_SPREADSHEETS:
            return({...state,spreadsheet_array:action.payload})
        case ActionTypes.SELECT_FIELD:
            return({...state,field_selected:action.payload}) 
        case ActionTypes.ADD_LEFT_COLUMN:
            return({...state,field_selected:'',spread_data:action.payload})   
        case ActionTypes.ADD_RIGHT_COLUMN:
                return({...state,field_selected:'',spread_data:action.payload})  
        case ActionTypes.SORT_ATOZ:
                return({...state,field_selected:'',spread_data:action.payload}) 
        case ActionTypes.SORT_ZTOA:
                return({...state,field_selected:'',spread_data:action.payload}) 
        case ActionTypes.CELL_CHANGE:
                return({...state,spread_data:action.payload})    
        case ActionTypes.ROWS_ADDED:
                return ({...state,spread_data:action.payload})
        case ActionTypes.ROW_COUNT_CHANGE:
                return({...state,add_row_count:action.payload})                                                          
        default:
            return state    
    }
}