import { TIngredient } from "../../utils/types";


export const getIngredients = (ingredients: Array<string>, items: readonly TIngredient[]) =>
    ingredients
    .map(( id: string ) => items
        .find(( e: { _id: string } ) => e._id === id))
        .filter(( e: any ) => e._id !== undefined);