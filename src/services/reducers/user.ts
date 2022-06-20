import {
    CREATE_USER_SUCCESS,
    GET_USER_SUCCESS,
    LOGOUT,
    SIGN_IN_SUCCESS,
    UPDATE_USER_SUCCESS,
    SET_LOADING,
    SIGN_IN_FAILED,
    CREATE_USER_FAILED
} from "../actions/user";

const initialState: any = {
    user: null,
    loading: false,

    loginErrorMessage: null,
    registerErrorMessage: null,
}

export const userReducer = (state = initialState, action: any) => {
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
                user: null
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
                registerErrorMessage: null,
                user: action.user
            }
        }

        case SIGN_IN_SUCCESS: {
            return {
                ...state,
                loginErrorMessage: null,
                user: action.user
            }
        }

        default: {
            return state
        }
    }
}