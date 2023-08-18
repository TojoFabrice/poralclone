import { call, put, takeEvery } from "redux-saga/effects";
import { GET_INFOS_RECRUTEUR, UPDATE_RECRUTEUR } from "../action-type";
import { getInfoRecruteurRequest, updateRecruteurQuery } from "../api/Recruteur";
import { IGetInfosRecruteur, IUpdateRecruteur, getInfosRecruteurSuccess, updateRecruteurSuccess } from "../actions/Recruteur";
import { toast } from "react-toastify";

function* getInfosRecruteur({token, userId}: IGetInfosRecruteur): Generator<any, void, any> {
    try {

        if (token) {
            const response = yield call(getInfoRecruteurRequest, token, userId)
            
            if (!response) {
                console.log("Pas de reponse")
            } else if (response.status === 200) {
                yield put(getInfosRecruteurSuccess(response.data))

                console.log("Recuperation info recruteur success")
            } else if (response.status == 403) {
                console.log("Pas d'autorisation");   
            }
        }
        
    } catch (error) {
        console.log(error)
    }
}

function* updateRecruteur({data, userId}: IUpdateRecruteur): Generator<any, void, any> {
    try {
        const response = yield call(updateRecruteurQuery, data, userId)
            
        if (!response) {
            console.log("Pas de reponse")
        } else if (response.status === 200) {
            yield put(updateRecruteurSuccess(response.data))
            toast.success('Mise à jour success !', {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log("Mise à jour info recruteur success")
        } else if (response.status == 403) {
            // toast.error('E-mail déjà existé !', {
            //     position: toast.POSITION.TOP_RIGHT
            // });
            console.log("Pas d'autorisation");   
        }
        
    } catch (error) {
        console.log(error)
    }
}

export default function* recruteurSage() {
    yield takeEvery(GET_INFOS_RECRUTEUR, getInfosRecruteur)
    yield takeEvery(UPDATE_RECRUTEUR, updateRecruteur)
}