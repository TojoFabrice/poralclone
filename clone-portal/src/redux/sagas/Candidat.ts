import { call, put, takeEvery } from "redux-saga/effects";
import { GET_INFOS_CANDIDAT, UPDATE_CANDIDAT, UPDATE_PASSWORD } from "../action-type";
import { getInfoCandidatRequest, updateCandidatQuery, updatePasswordRequest } from "../api/Candidat";
import { IGetInfosCandidat, IUpdateCandidat, IUpdatePassword, getInfosCandidatSuccess, updateCandidatSuccess, updatePasswordSuccess } from "../actions/Candidat";
import { toast } from "react-toastify";


function* getInfosCandidat({token, userId}: IGetInfosCandidat): Generator<any, void, any> {
    try {

        if (token) {
            const response = yield call(getInfoCandidatRequest, token, userId)
            
            if (!response) {
                console.log("Pas de reponse")
            } else if (response.status === 200) {
                yield put(getInfosCandidatSuccess(response.data))

                console.log("Recuperation info candidat success")
            } else if (response.status == 403) {
                console.log("Pas d'autorisation");   
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

function* updateCandidats({data, userId}:IUpdateCandidat): Generator<any, void, any> {
    try {
        const response = yield call(updateCandidatQuery, data, userId)

        if (!response) {
            console.log("pas de response");
        }
        else if (response.status === 200) {
            yield put(updateCandidatSuccess(response.data))
            toast.success('Mise à jour success !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("Mise à jour info candidat success")
        } else if (response.status == 401) {
            toast.error('Email existe déjà!', {
                position: toast.POSITION.TOP_RIGHT
            });
        } else if (response.status == 403) {
            // toast.error('E-mail déjà existé !', {
            //     position: toast.POSITION.TOP_RIGHT
            // });
            console.log("Pas d'autorisation");   
        }
    } catch (error: any) {
        if (error.response) {
            const responseData = error.response.data;
            // Traitez les données d'erreur ici si nécessaire
            console.error('Erreur de l\'API:', responseData);
            return responseData; // Renvoyer les données d'erreur
          }
        console.log(error)
    }
}

function* updatePassword({newpassword, userId}:IUpdatePassword): Generator<any, void, any> {
    try {
        const response = yield call(updatePasswordRequest, newpassword, userId)

        if (!response) {
            console.log("Pas de reponse")
        } else if (response.status === 200) {
            yield put(updatePasswordSuccess(response.data))
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("MAJ PASSWORD success")
        } else if (response.status == 403) {
            console.log("Pas d'autorisation");   
        }
    } catch (error) {
        console.log(error)
    }
}

export default function* candidatSaga() {
    yield takeEvery(GET_INFOS_CANDIDAT, getInfosCandidat)
    yield takeEvery(UPDATE_CANDIDAT, updateCandidats)
    yield takeEvery(UPDATE_PASSWORD, updatePassword)
}