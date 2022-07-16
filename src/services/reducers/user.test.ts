import { userReducer, initialState, TUserState, } from "./user";
import {
    createUserFailed, createUserSuccess, getUserSuccess,
    logoutAction,
    setLoading,
    signInFailed, signInSuccess,
    TUserActions,
    updateUserSuccess
} from "../actions/user";
import { TUserData } from "../../utils/types";
import { user } from "../../utils/mock-data";

describe("Test user reducer", () => {
    let state: TUserState = {
        user,
        loading: false,
        loginErrorMessage: "",
        registerErrorMessage: "",
    }

    it("Default state", () => {
        expect(userReducer(undefined, {} as TUserActions)).toEqual(initialState)
    })

    it("Create user failed", () => {
        expect(userReducer(initialState, createUserFailed("500"))).toEqual({
            ...initialState,
            registerErrorMessage: "500"
        })
    })

    it("Sign in failed", () => {
        expect(userReducer(initialState, signInFailed("500"))).toEqual({
            ...initialState,
            loginErrorMessage: "500"
        })
    })

    it("Set loading", () => {
        expect(userReducer(initialState, setLoading())).toEqual({
            ...initialState,
            loading: true
        })
    })

    it("Update user success", () => {
        const user: TUserData = {
            email: "newtest@test.com",
            name: "NewJohn"
        }

        expect(userReducer(state, updateUserSuccess(user))).toEqual({
            ...state,
            user
        })
    })

    it("Logout", () => {
        expect(userReducer(state, logoutAction())).toEqual({
            ...state,
            user: null as any
        })
    })

    it("Get user success", () => {
        expect(userReducer(initialState, getUserSuccess(user))).toEqual({
            ...initialState,
            loading: false,
            user
        })
    })

    it("Create user success", () => {
        expect(userReducer(initialState, createUserSuccess(user))).toEqual({
            ...initialState,
            registerErrorMessage: "",
            user
        })
    })

    it("Sign in success", () => {
        expect(userReducer(initialState, signInSuccess(user))).toEqual({
            ...initialState,
            loginErrorMessage: "",
            user
        })
    })
})