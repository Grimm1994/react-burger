import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredients";
import { orderReducer } from "./order";
import { cartReducer } from "./cart";
import { userReducer } from "./user";
import { feedReducer } from "./ws";

export const rootReducer = combineReducers({
    ingredients: ingredientReducer,
    order: orderReducer,
    cart: cartReducer,
    user: userReducer,
    feed: feedReducer
})