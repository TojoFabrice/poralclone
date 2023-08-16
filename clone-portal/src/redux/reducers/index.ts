// combineReducers come from redux that used for combining reducers that we just made.
import {combineReducers} from 'redux'

// Reducers
import Auth from './Auth'
import Candidat from './Candidat'


export default combineReducers({
    auth: Auth,
    candidat: Candidat
})