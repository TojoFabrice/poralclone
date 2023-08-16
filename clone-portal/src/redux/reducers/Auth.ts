import { GET_INFO_USER_CONNECTED, GET_INFO_USER_CONNECTED_SUCCESS, REGISTER_RECRUTEUR, REGISTER_RECRUTEUR_SUCCESS, REGISTER_USER, REGISTER_USER_SUCCESS, SIGNIN_USER_SUCCESS, SIGNOUT_USER_SUCCESS } from "../action-type";

interface IState {
    token: string | null,
    register_success: any,
    register_recruteur_success: any,
    users: any
}

const userToken: string | null = localStorage.getItem('userToken');

const initialState: IState = {
    token: userToken !== null ? userToken : null,
    register_success: null,
    register_recruteur_success: null,
    users: null
}

export default (state = initialState, action:any) => {
    switch (action.type){
        case SIGNIN_USER_SUCCESS:
            localStorage.setItem('userToken', action.payload.token)

            return {
                ...state,
                token: action.payload.token,
            }

        case SIGNOUT_USER_SUCCESS:
            localStorage.removeItem('userToken')

            return {
                ...state,
                token: null
            }

        case REGISTER_USER:
            return {
                ...state,
                register_success: null
            }

        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                register_success: action.payload
            }

        case REGISTER_RECRUTEUR:
            return {
                ...state,
                register_recruteur_success: null
            }

        case REGISTER_RECRUTEUR_SUCCESS:
            return {
                ...state,
                register_recruteur_success: action.payload
            }

        case GET_INFO_USER_CONNECTED:
            return {
                ...state,
                users: null
            }

        case GET_INFO_USER_CONNECTED_SUCCESS:
            return {
                ...state,
                users: action.payload
            }

        default: 
            return state
    }
}