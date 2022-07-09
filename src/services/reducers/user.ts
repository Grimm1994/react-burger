import {
    CREATE_USER_SUCCESS,
    GET_USER_SUCCESS,
    LOGOUT,
    SIGN_IN_SUCCESS,
    UPDATE_USER_SUCCESS,
    SET_LOADING,
    SIGN_IN_FAILED,
    CREATE_USER_FAILED, TUserActions
} from "../actions/user";
import { TUserData } from "../../utils/types";

type TUserState = {
    user: TUserData,
    loading: boolean,
    loginErrorMessage: string,
    registerErrorMessage: string
}

const initialState: TUserState = {
    user: null as any,
    loading: false,
    loginErrorMessage: "",
    registerErrorMessage: "",
}

export const userReducer = (state = initialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case CREATE_USER_FAILED: {
            return {
                ...state,
                registerErrorMessage: action.message
            }
        }

        case SIGN_IN_FAILED: {
            return {
                ...state,
                loginErrorMessage: action.message
            }
        }

        case SET_LOADING: {
            return {
                ...state,
                loading: true
            }
        }

        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                user: action.user
            }
        }

        case LOGOUT: {
            return {
                ...state,
                user: null as any
            }
        }

        case GET_USER_SUCCESS: {
            return {
                ...state,
                loading: false,
                user: action.user,
            }
        }

        case CREATE_USER_SUCCESS: {
            return {
                ...state,
                registerErrorMessage: "",
                user: action.user
            }
        }

        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                loginErrorMessage: "",
                user: action.user
            }
        }

        default: {
            return state
        }
    }
}