import { TUniqueIngredient } from "../../utils/types";

export const SET_TOTAL_SUM = "SET_TOTAL_SUM";

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";

export const SET_BUN = "SET_BUN";

export const SORT_INGREDIENTS = "SORT_INGREDIENTS";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";


export const setTotalSum = (sum: number): any => {
    return {
        type: SET_TOTAL_SUM,
        sum
    }
}

export const addConstructorItem = (item: TUniqueIngredient): any => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        item
    }
}

export const setBun = (item: TUniqueIngredient): any => {
    return {
        type: SET_BUN,
        item
    }
}

export const deleteConstructorItem = (item: TUniqueIngredient): any => {
    return {
        type: DELETE_CONSTRUCTOR_ITEM,
        item
    }
}


export const sortIngredients = (items: TUniqueIngredient[]): any => {
    return {
        type: SORT_INGREDIENTS,
        items
    }
}

export const clearConstructor = (): any => {
    return {
        type: CLEAR_CONSTRUCTOR,
    }
}