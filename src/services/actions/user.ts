import API from "../../utils/api";
import { TLoginState, TRegisterState, TUserDataState } from "../../utils/types";

export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";

export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const LOGOUT = "LOGOUT";

export const SET_LOADING = "SET_LOADING";

const logoutAction = (): any => {
    return {
        type: LOGOUT
    }
}

const setLoading = (): any => {
    return {
        type: SET_LOADING
    }
}

const getUserSuccess = (user: Array<any>): any => {
    return {
        type: GET_USER_SUCCESS,
        user
    }
}

const updateUserSuccess = (user: Array<any>): any => {
    return {
        type: UPDATE_USER_SUCCESS,
        user
    }
}

const createUserSuccess = (user: Array<any>): any => {
    return {
        type: CREATE_USER_SUCCESS,
        user
    }
}

const createUserFailed = (message: string): any => {
    return {
        type: CREATE_USER_FAILED,
        message
    }
}

const signInFailed = (message: string): any => {
    return {
        type: SIGN_IN_FAILED,
        message
    }
}

const signInSuccess = (user: Array<any>): any => {
    return {
        type: SIGN_IN_SUCCESS,
        user
    }
}

export const logout = (): any => (dispatch: any) => {
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

export const getUser = (): any => (dispatch: any) => {
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

export const updateUser = (data: TUserDataState): any => (dispatch: any) => {
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

export const createUser = (data: TRegisterState): any => (dispatch: any) => {
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

export const signIn = (data: TLoginState): any => (dispatch: any) => {
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

const updateToken = async (err: { message: string }, callback: () => void) => {
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

const saveTokens = (response: any) => {
    let accessToken;
    if (response.accessToken.indexOf("Bearer") === 0) {
        accessToken = response.accessToken.split("Bearer ")[1];
    }

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
}