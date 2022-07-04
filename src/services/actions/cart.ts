import { TUniqueIngredient } from "../../utils/types";

export const SET_TOTAL_SUM: "SET_TOTAL_SUM" = "SET_TOTAL_SUM";

export const ADD_CONSTRUCTOR_ITEM: "ADD_CONSTRUCTOR_ITEM" = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM: "DELETE_CONSTRUCTOR_ITEM" = "DELETE_CONSTRUCTOR_ITEM";

export const SET_BUN: "SET_BUN" = "SET_BUN";

export const SORT_INGREDIENTS: "SORT_INGREDIENTS" = "SORT_INGREDIENTS";

export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";

export type TSetTotalSum = {
    readonly type: typeof SET_TOTAL_SUM,
    readonly sum: number
}

export type TAddConstructorItem = {
    readonly type: typeof ADD_CONSTRUCTOR_ITEM,
    readonly item: TUniqueIngredient
}

export type TSetBun = {
    readonly type: typeof SET_BUN,
    readonly item: TUniqueIngredient
}

export type TDeleteConstructorItem = {
    readonly type: typeof DELETE_CONSTRUCTOR_ITEM,
    readonly item: TUniqueIngredient
}

export type TSortIngredients = {
    readonly type: typeof SORT_INGREDIENTS,
    readonly items: ReadonlyArray<TUniqueIngredient>
}

export type TClearConstructor = {
    readonly type: typeof CLEAR_CONSTRUCTOR,
}

export const setTotalSum = ( sum: number ): TSetTotalSum => {
    return {
        type: SET_TOTAL_SUM,
        sum
    }
}

export const addConstructorItem = ( item: TUniqueIngredient ): TAddConstructorItem => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        item
    }
}

export const setBun = ( item: TUniqueIngredient ): TSetBun => {
    return {
        type: SET_BUN,
        item
    }
}

export const deleteConstructorItem = ( item: TUniqueIngredient ): TDeleteConstructorItem => {
    return {
        type: DELETE_CONSTRUCTOR_ITEM,
        item
    }
}


export const sortIngredients = ( items: TUniqueIngredient[] ): TSortIngredients => {
    return {
        type: SORT_INGREDIENTS,
        items
    }
}

export const clearConstructor = (): TClearConstructor => {
    return {
        type: CLEAR_CONSTRUCTOR,
    }
}