import {combineReducers} from 'redux'
import LoginReducer from './Reducers/LoginReducer';
import { connectRouter } from 'connected-react-router';
import DashboardReducer from './Reducers/DashboardReducer';
import SpreadsheetReducer from './Reducers/SpreadsheetReducer';

export default (history)=>combineReducers({
    router:connectRouter(history),
    loginReducer:LoginReducer,
    dashboardReducer:DashboardReducer,
    spreadsheetReducer:SpreadsheetReducer
})