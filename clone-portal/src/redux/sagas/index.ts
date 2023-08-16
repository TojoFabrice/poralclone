import {spawn} from 'redux-saga/effects'

// Sagas
import authSaga from './Auth'
import candidatSaga from './Candidat'


// Export the root saga
export default function* rootSaga() {
    yield spawn(authSaga)
    yield spawn(candidatSaga)
}