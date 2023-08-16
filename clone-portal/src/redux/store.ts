import {applyMiddleware, createStore} from 'redux'

import createSagaMiddleware from 'redux-saga'

// This is the root saga that will contain our sagas, or I should say model? XD
import rootSaga from './sagas'

// This will be contain our reducer for the application
import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
)

// Run redux-saga
sagaMiddleware.run(rootSaga)

export default store