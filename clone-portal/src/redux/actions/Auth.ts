import { GET_INFO_USER_CONNECTED, GET_INFO_USER_CONNECTED_SUCCESS, REGISTER_RECRUTEUR, REGISTER_RECRUTEUR_SUCCESS, REGISTER_USER, REGISTER_USER_SUCCESS, SIGNIN_USER, SIGNIN_USER_SUCCESS, SIGNOUT_USER, SIGNOUT_USER_SUCCESS } from "../action-type";

export interface RegisterUserAction {
    type: typeof REGISTER_USER;
    payload: {
        name: string;
        email: string;
        role: string;
        password: string;
    };
}

export interface RegisterRecruteurAction {
    type: typeof REGISTER_RECRUTEUR;
    payload: {
        societe_name: string;
        email: string;
        password: string;
    };
}

export interface SigninUserAction {
    type: typeof SIGNIN_USER;
    payload: {
        email: string;
        password: string;
    };
}

export interface SignoutUserAction {
    type: typeof SIGNOUT_USER;
    payload: {
        token: string;
    };
}

export interface InfoUserConnectedAction {
    type: typeof GET_INFO_USER_CONNECTED;
    payload: {
        token: string;
    };
}

////////////////////////////////////////////////////////////////////////////////////////////////////////

export const registerUser = (name:string, email: string, role:string,  password: string): RegisterUserAction => {
    return {
        type: REGISTER_USER,
        payload: {name, email, role, password}
    }
}

export const registerUserSuccess = (data:any) => {
    return {
        type: REGISTER_USER_SUCCESS,
        payload: data
    }
}

export const registerRecruteur = (societe_name: string, email: string, password: string): RegisterRecruteurAction => {
    return {
        type: REGISTER_RECRUTEUR,
        payload: {societe_name, email, password}
    }
}

export const registerRecruteurSuccess = (data:any) => {
    return {
        type: REGISTER_RECRUTEUR_SUCCESS,
        payload: data
    }
}

export const userSignIn = (email: string, password: string):SigninUserAction => {
    return {
        type: SIGNIN_USER,
        payload: {email, password}
    }
}

export const userSignInSuccess = (token:any) => {
    return {
        type: SIGNIN_USER_SUCCESS,
        payload: token,
    }
}

export const userSignOut = (token:any):SignoutUserAction => {
    return {
        type: SIGNOUT_USER,
        payload: token
    }
}

export const userSignOutSuccess = (token:string) => {
    return {
        type: SIGNOUT_USER_SUCCESS,
        payload: token,
    }
}

export const infoUserConnected = (token:any):InfoUserConnectedAction => {
    return {
        type: GET_INFO_USER_CONNECTED,
        payload: token
    }
}

export const infoUserConnectedSuccess = (data:any) => {
    return {
        type: GET_INFO_USER_CONNECTED_SUCCESS,
        payload: data,
    }
}

