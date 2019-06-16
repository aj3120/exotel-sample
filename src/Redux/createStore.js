import reduxlogger from 'redux-logger';
import createRootReducer from './combineReducers'
import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import createSagaMiddleware from 'redux-saga';
import {watchAll} from './saga/root_saga'
export const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware()

export default function configureStore(preloadedState) {
  const composeEnhancers =typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        reduxlogger,sagaMiddleware// ... other middlewares ...
      ),
    ),
  )
  sagaMiddleware.run(watchAll)
  return store
}