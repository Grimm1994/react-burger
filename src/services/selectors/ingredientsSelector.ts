import { TIngredient } from "../../utils/types";


export const getIngredients = (ingredients: Array<string>, items: readonly TIngredient[]) =>
    ingredients
    .map(( id ) => items
        .find(( e ) => e._id === id))
        .filter(( e ) => e?._id !== undefined);