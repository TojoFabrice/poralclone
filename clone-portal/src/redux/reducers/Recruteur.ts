import { GET_INFOS_RECRUTEUR_SUCCESS, UPDATE_RECRUTEUR, UPDATE_RECRUTEUR_SUCCESS } from "../action-type"

interface IState {
    recruteur_infos: any,
    recruteur_datas: any
}

const initialState: IState = {
    recruteur_infos: null,
    recruteur_datas: null
}

export default (state = initialState, action: any) => {
    switch(action.type){
        case GET_INFOS_RECRUTEUR_SUCCESS:
            return{
                ...state,
                recruteur_infos: action.payload
            }

        case UPDATE_RECRUTEUR:
            return{
                ...state,
                recruteur_datas: null
            } 

        case UPDATE_RECRUTEUR_SUCCESS:
            return{
                ...state,
                recruteur_datas: action.payload
            }

        default:
            return state
    }
}