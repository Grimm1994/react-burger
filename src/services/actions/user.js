import API from "../../utils/api";

export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAILED = "CREATE_USER_FAILED";

export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const SIGN_IN_FAILED = "SIGN_IN_FAILED";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";

export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";

export const LOGOUT = "LOGOUT";

export const SET_LOADING = "SET_LOADING";


export const logout = () => dispatch => {
    API.logout("/auth/logout").then(response => {
        if (response.success) {
            dispatch({
                type: LOGOUT
            })

            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
        }
    })
}

export const getUser = () => async dispatch => {
    dispatch({
        type: SET_LOADING,
    })
    API.getUser("/auth/user").then(response => {
        if (response.success) {
            dispatch({
                type: GET_USER_SUCCESS,
                user: response.user
            })
        }
    }).catch(async err => {
        await updateToken(err, () => {
            API.getUser("/auth/user").then(response => {
                if (response.success) {
                    dispatch({
                        type: GET_USER_SUCCESS,
                        user: response.user
                    })
                }
            })
        });
    })
}

export const updateUser = data => async dispatch => {
    API.updateUser("/auth/user", data).then(response => {
        if (response.success) {
            dispatch({
                type: UPDATE_USER_SUCCESS,
                user: response.user
            })
        }
    }).catch(async err => {
        await updateToken(err, () => {
            API.updateUser("/auth/user", data).then(response => {
                if (response.success) {
                    dispatch({
                        type: UPDATE_USER_SUCCESS,
                        user: response.user
                    })
                }
            })
        });
    })
}

export const createUser = data => dispatch => {
    API.createUser("/auth/register", data).then(response => {
        if (response.success) {

            saveTokens(response);

            dispatch({
                type: CREATE_USER_SUCCESS,
                user: response.user
            })
        }
    }).catch(async err => {
        const res = await err;
        dispatch({
            type: CREATE_USER_FAILED,
            message: res.message
        })
    })
}

export const signIn = data => dispatch => {
    API.signIn("/auth/login", data).then(response => {
        if (response.success) {

            saveTokens(response);

            dispatch({
                type: SIGN_IN_SUCCESS,
                user: response.user
            })
        }
    }).catch(async err => {
        const res = await err;
        dispatch({
            type: SIGN_IN_FAILED,
            message: res.message
        })
    })
}

const updateToken = async (err, callback) => {
    const res = await err;

    if (res.message === "jwt expired") {
        const refreshToken = localStorage.getItem("refreshToken");

        API.updateToken("/auth/token",refreshToken).then(response => {
            if (response.success) {
                saveTokens(response);

                callback();
            }
        })
    }
}

const saveTokens = (response) => {
    let accessToken;
    if (response.accessToken.indexOf("Bearer") === 0) {
        accessToken = response.accessToken.split("Bearer ")[1];
    }

    localStorage.setItem("token", accessToken);
    localStorage.setItem("refreshToken", response.refreshToken);
}