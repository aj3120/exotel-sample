import {all } from 'redux-saga/effects';
import {sagaLogin,sagaSignup,sagaLogout} from './saga_login';
import {sagaGetUsers} from './saga_getUsers';
import {sagaSheet} from './saga_sheets'
export function *watchAll() {
  yield all([
    sagaLogin(),
    sagaGetUsers(),
    sagaSignup(),
    sagaSheet(),
    sagaLogout()
  ]);
}