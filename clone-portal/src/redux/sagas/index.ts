import {spawn} from 'redux-saga/effects'

// Sagas
import authSaga from './Auth'
import candidatSaga from './Candidat'
import recruteurSage from './Recruteur'


// Export the root saga
export default function* rootSaga() {
    yield spawn(authSaga)
    yield spawn(candidatSaga)
    yield spawn(recruteurSage)
}