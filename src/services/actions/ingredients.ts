import API from "../../utils/api";
import { TIngredient } from "../../utils/types";
import { AppDispatch, AppThunk } from "../types";

export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" = "SET_CURRENT_INGREDIENT";
export const UNSET_CURRENT_INGREDIENT: "UNSET_CURRENT_INGREDIENT" = "UNSET_CURRENT_INGREDIENT";

export type TGetIngredientsRequest = {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export type TGetIngredientsFailed = {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export type TGetIngredientsSuccess = {
    readonly type: typeof GET_INGREDIENTS_SUCCESS,
    readonly items: ReadonlyArray<TIngredient>
}

export type TSetCurrentIngredient = {
    readonly type: typeof SET_CURRENT_INGREDIENT,
    readonly item: TIngredient
}

export type TUnsetCurrentIngredient = {
    readonly type: typeof UNSET_CURRENT_INGREDIENT,
}

export type TIngredientsActions =
    | TGetIngredientsRequest
    | TGetIngredientsFailed
    | TGetIngredientsSuccess
    | TSetCurrentIngredient
    | TUnsetCurrentIngredient

const getIngredientsRequest = (): TGetIngredientsRequest => {
    return {
        type: GET_INGREDIENTS_REQUEST
    }
}

const getIngredientsFailed = (): TGetIngredientsFailed => {
    return {
        type: GET_INGREDIENTS_FAILED
    }
}

const getIngredientsSuccess = ( items: TIngredient[] ): TGetIngredientsSuccess => {
    return {
        type: GET_INGREDIENTS_SUCCESS,
        items
    }
}

export const setCurrentIngredient = ( item: TIngredient ): TSetCurrentIngredient => {
    return {
        type: SET_CURRENT_INGREDIENT,
        item
    }
}

export const unsetCurrentIngredient = (): TUnsetCurrentIngredient => {
    return {
        type: UNSET_CURRENT_INGREDIENT
    }
}

export const getIngredients = (): AppThunk => ( dispatch: AppDispatch ) => {
    dispatch(getIngredientsRequest());

    API.getIngredients("/ingredients").then(response => {
        const { success, data } = response;

        if (success && data) {
            dispatch(getIngredientsSuccess(data));
        } else {
            dispatch(getIngredientsFailed());
        }
    }).catch(err => {
        dispatch(getIngredientsFailed());
    })
}