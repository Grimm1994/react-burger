import API from "../../utils/api";
import { TLoginState, TRegisterState, TUserDataState, TUserData } from "../../utils/types";
import { AppDispatch, AppThunk } from "../types";

export const CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS" = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED: "CREATE_USER_FAILED" = "CREATE_USER_FAILED";
export const SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS" = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED: "SIGN_IN_FAILED" = "SIGN_IN_FAILED";
export const GET_USER_SUCCESS: "GET_USER_SUCCESS" = "GET_USER_SUCCESS";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const LOGOUT: "LOGOUT" = "LOGOUT";
export const SET_LOADING: "SET_LOADING" = "SET_LOADING";

type TLogoutAction = {
    readonly type: typeof LOGOUT
}

type TSetLoading = {
    readonly type: typeof SET_LOADING
}

type TGetUserSuccess = {
    readonly type: typeof GET_USER_SUCCESS,
    readonly user: TUserData
}

type TUpdateUserSuccess = {
    readonly type: typeof UPDATE_USER_SUCCESS,
    readonly user: TUserData
}

type TCreateUserSuccess = {
    readonly type: typeof CREATE_USER_SUCCESS,
    readonly user: TUserData
}

type TCreateUserFailed = {
    readonly type: typeof CREATE_USER_FAILED,
    readonly message: string
}

type TSignInFailed = {
    readonly type: typeof SIGN_IN_FAILED,
    readonly message: string
}

type TSignInSuccess = {
    readonly type: typeof SIGN_IN_SUCCESS,
    readonly user: TUserData
}

export type TUserActions =
    | TLogoutAction
    | TSetLoading
    | TGetUserSuccess
    | TUpdateUserSuccess
    | TCreateUserSuccess
    | TCreateUserFailed
    | TSignInFailed
    | TSignInSuccess

const logoutAction = (): TLogoutAction => {
    return {
        type: LOGOUT
    }
}

const setLoading = (): TSetLoading => {
    return {
        type: SET_LOADING
    }
}

const getUserSuccess = ( user: TUserData ): TGetUserSuccess => {
    return {
        type: GET_USER_SUCCESS,
        user
    }
}

const updateUserSuccess = ( user: TUserData ): TUpdateUserSuccess => {
    return {
        type: UPDATE_USER_SUCCESS,
        user
    }
}

const createUserSuccess = ( user: TUserData ): TCreateUserSuccess => {
    return {
        type: CREATE_USER_SUCCESS,
        user
    }
}

const createUserFailed = ( message: string ): TCreateUserFailed => {
    return {
        type: CREATE_USER_FAILED,
        message
    }
}

const signInFailed = ( message: string ): TSignInFailed => {
    return {
        type: SIGN_IN_FAILED,
        message
    }
}

const signInSuccess = ( user: TUserData ): TSignInSuccess => {
    return {
        type: SIGN_IN_SUCCESS,
        user
    }
}

export const logout = (): AppThunk => ( dispatch: AppDispatch ) => {
    API.logout("/auth/logout").then(response => {
        if (response.success) {
            dispatch(logoutAction());

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        }
    }).catch(err => {
        console.log(err);
    })
}

export const getUser = (): AppThunk => ( dispatch: AppDispatch ) => {
    dispatch(setLoading())
    API.getUser("/auth/user").then(response => {
        if (response.success) {
            dispatch(getUserSuccess(response.user))
        }
    }).catch(async err => {
        await updateToken(err, () => {
            API.getUser("/auth/user").then(response => {
                if (response.success) {
                    dispatch(getUserSuccess(response.user))
                }
            })
        });
    })
}

export const updateUser = ( data: TUserDataState ): AppThunk => ( dispatch: AppDispatch ) => {
    API.updateUser("/auth/user", data).then(response => {
        if (response.success) {
            dispatch(updateUserSuccess(response.user));
        }
    }).catch(async err => {
        await updateToken(err, () => {
            API.updateUser("/auth/user", data).then(response => {
                if (response.success) {
                    dispatch(updateUserSuccess(response.user));
                }
            })
        });
    })
}

export const createUser = ( data: TRegisterState ): AppThunk => ( dispatch: AppDispatch ) => {
    API.createUser("/auth/register", data).then(response => {
        if (response.success) {

            saveTokens(response);
            dispatch(createUserSuccess(response.user));
        }
    }).catch(async err => {
        const res = await err;
        dispatch(createUserFailed(res.message));
    })
}

export const signIn = ( data: TLoginState ): AppThunk => ( dispatch: AppDispatch ) => {
    API.signIn("/auth/login", data).then(response => {
        if (response.success) {
            saveTokens(response);
            dispatch(signInSuccess(response.user));
        }
    }).catch(async err => {
        const res = await err;
        dispatch(signInFailed(res.message));
    })
}

export const updateToken = async ( err: { message: string }, callback: () => void ) => {
    const res = await err;

    if (res.message === "jwt expired") {
        const refreshToken = localStorage.getItem("refreshToken");

        API.updateToken("/auth/token", refreshToken).then(response => {
            if (response.success) {
                saveTokens(response);

                callback();
            }
        }).catch(err => {
            console.log(err);
        })
    }
}

const saveTokens = ( response: { [name: string]: string } ) => {
    let accessToken = "";
    if (response.accessToken.indexOf("Bearer") === 0) {
        accessToken = response.accessToken.split("Bearer ")[1];
    }

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
}