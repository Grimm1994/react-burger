import store from "../store";
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TIngredientsActions } from "../actions/ingredients";
import { TOrderActions } from "../actions/order";
import { TCartActions } from "../actions/cart";
import { TUserActions } from "../actions/user";
import { TWsActions } from "../actions/ws";

export type TApplicationActions = TIngredientsActions | TOrderActions | TCartActions | TUserActions | TWsActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    never,
    TApplicationActions>;