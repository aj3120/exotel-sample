import {all } from 'redux-saga/effects';
import {sagaLogin} from './saga_login';
import {sagaGetUsers} from './saga_getUsers';
export function *watchAll() {
  yield all([
    sagaLogin(),
    sagaGetUsers()
  ]);
}