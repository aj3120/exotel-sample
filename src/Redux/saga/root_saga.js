import {all } from 'redux-saga/effects';
import {sagaLogin,sagaSignup,sagaLogout} from './saga_login';
import {sagaGetUsers} from './saga_getUsers';
import {sagaCreateSheet,sagaGetSheet} from './saga_sheets'
export function *watchAll() {
  yield all([
    sagaLogin(),
    sagaGetUsers(),
    sagaSignup(),
    sagaCreateSheet(),
    sagaGetSheet(),
    sagaLogout()
  ]);
}