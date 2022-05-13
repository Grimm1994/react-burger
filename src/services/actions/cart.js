export const SET_TOTAL_SUM = "SET_TOTAL_SUM";

export const ADD_CONSTRUCTOR_ITEM = "ADD_CONSTRUCTOR_ITEM";
export const DELETE_CONSTRUCTOR_ITEM = "DELETE_CONSTRUCTOR_ITEM";

export const SET_BUN = "SET_BUN";

export const SORT_INGREDIENTS = "SORT_INGREDIENTS";

export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";


export const setTotalSum = (sum) => {
    return {
        type: SET_TOTAL_SUM,
        sum
    }
}

export const addConstructorItem = (item) => {
    return {
        type: ADD_CONSTRUCTOR_ITEM,
        item
    }
}

export const setBun = (item) => {
    return {
        type: SET_BUN,
        item
    }
}

export const deleteConstructorItem = (item) => {
    return {
        type: DELETE_CONSTRUCTOR_ITEM,
        item
    }
}


export const sortIngredients = (items) => {
    return {
        type: SORT_INGREDIENTS,
        items
    }
}

export const clearConstructor = () => {
    return {
        type: CLEAR_CONSTRUCTOR,
    }
}