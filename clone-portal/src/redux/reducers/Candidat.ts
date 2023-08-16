import { GET_INFOS_CANDIDAT_SUCCESS, UPDATE_CANDIDAT, UPDATE_CANDIDAT_SUCCESS, UPDATE_PASSWORD, UPDATE_PASSWORD_SUCCESS } from "../action-type";

interface IState {
    candidat_datas: any
    candidat_infos: any
    newpassword: string
}

const initialState: IState = {
    candidat_datas: null,
    candidat_infos: null,
    newpassword: ""
}

export default (state = initialState, action: any) => {
    switch(action.type){

        case GET_INFOS_CANDIDAT_SUCCESS:
            return {
                ...state,
                candidat_datas: action.payload
            }

        case UPDATE_CANDIDAT:
            return {
                ...state,
                candidat_infos: null
            }

        case UPDATE_CANDIDAT_SUCCESS:
            return {
                ...state,
                candidat_infos: action.payload
            }

        case UPDATE_PASSWORD:
            return {
                ...state,
                newpassword: null
            }

        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                newpassword: action.payload
            }

        default:
            return state
    }

}