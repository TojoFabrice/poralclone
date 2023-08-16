import { takeEvery, call, put } from "redux-saga/effects";
import { GET_INFO_USER_CONNECTED, REGISTER_RECRUTEUR, REGISTER_USER, SIGNIN_USER, SIGNOUT_USER } from "../action-type";
import { getInfoUserConnected, registerRecruteurRequest, registerUserRequest, signInWithEmailPassword, signOutRequest } from "../api/Auth";
import { InfoUserConnectedAction, RegisterRecruteurAction, RegisterUserAction, SigninUserAction, SignoutUserAction, infoUserConnectedSuccess, registerRecruteurSuccess, registerUserSuccess, userSignInSuccess, userSignOutSuccess } from "../actions/Auth";
import { toast } from 'react-toastify';

function* registerUser (action: RegisterUserAction): Generator<any, void, any> {
    try {
        const response = yield call(registerUserRequest, action.payload)

        if (!response) {
            console.log("pas de reponse")
        } else if (response.status === 200) {
            yield put(registerUserSuccess(response.data))
            toast.success('Enregistrement success !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("Enregistrement success")
        } else if (response.status == 401) {
            toast.error('Utilisateur déjà existé !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    } catch (error) {
        console.log(error)
    }
}

function* registerRecruteur(action: RegisterRecruteurAction): Generator<any, void, any> {
    try {
        const response = yield call(registerRecruteurRequest, action.payload)

        if (!response) {
            console.log("pas de reponse")
        } else if (response.status === 200) {
            yield put(registerRecruteurSuccess(response.data))
            toast.success('Enregistrement success !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("Enregistrement success")
        } else if (response.status == 401) {
            toast.error('Utilisateur déjà existé !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    } catch (error) {
        console.log(error)
    }
}

function* SigninUser (action:SigninUserAction): Generator<any, void, any>{
    try {
        const {email, password} = action.payload
        const response = yield call(signInWithEmailPassword, email, password)

        if (!response) {
            console.log("Pas de reponse")
        } else if (response.status === 200) {
            yield put(userSignInSuccess(response.data))
            toast.success('Authentification success !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("Authentification success")
        } else if (response.status == 401) {
            toast.error('Mot de passe ou email erroné !', {
                position: toast.POSITION.TOP_RIGHT
            });
        }
    } catch (error) {
        console.log(error)
    }
}


function* SigninOut (action:SignoutUserAction): Generator<any, void, any>{
    try {
        const response = yield call(signOutRequest, action.payload)

        if (!response) {
            console.log("Pas de reponse")
        } else if (response.status === 200) {
            yield put(userSignOutSuccess(response.data))
            toast.success('Deconnexion success !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("Deconnexion success")
        } else if (response.status == 403) {
            console.log("Pas d'autorisation");   
        }
    } catch (error) {
        console.log(error)
    }
}

function* getUserConnectedRequest(action:InfoUserConnectedAction): Generator<any, void, any> {
    try {
        const response = yield call(getInfoUserConnected, action.payload)
        
        if (!response) {
            console.log("Pas de reponse")
        } else if (response.status === 200) {
            yield put(infoUserConnectedSuccess(response.data))
            // toast.success('Deconnexion success !', {
            //     position: toast.POSITION.TOP_RIGHT
            // });
            console.log("Recuperation info users success")
        } else if (response.status == 403) {
            console.log("Pas d'autorisation");   
        }
    } catch (error) {
        console.log(error)
    }
}


export default function* todoSaga() {
    yield takeEvery(SIGNIN_USER, SigninUser)
    yield takeEvery(SIGNOUT_USER, SigninOut)
    yield takeEvery(REGISTER_USER, registerUser)
    yield takeEvery(REGISTER_RECRUTEUR, registerRecruteur)
    yield takeEvery(GET_INFO_USER_CONNECTED, getUserConnectedRequest)
}