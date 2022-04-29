export const appReducer = (state, action) => {
    switch (action.type) {
        case "setIngredients":
            return {
                ...state,
                ingredients: action.payload
            }

        case "setTotalSum":
            return {
                ...state,
                totalSum: action.payload
            }

        case "setOrderNumber":
            return {
                ...state,
                order: {
                    ...state.order,
                    number: action.payload
                }

            }

        default:
            throw new Error(`Wrong type of action: ${action.type}`);
    }
}
