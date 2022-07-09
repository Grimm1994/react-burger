import {
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_FAILED, TOrderActions,
} from "../actions/order";
import { TOrder } from "../../utils/types";

type TOrderState = {
    orderRequest: boolean,
    orderFailed: boolean,
    order: TOrder
}

const initialState: TOrderState = {
    orderRequest: false,
    orderFailed: false,
    order: {} as TOrder,
}

export const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
    switch (action.type) {

        case GET_ORDER_NUMBER_REQUEST: {
            return {
                ...state,
                orderRequest: true,
            }
        }

        case GET_ORDER_NUMBER_FAILED: {
            return {
                ...state,
                orderFailed: true,
            }
        }

        case GET_ORDER_NUMBER_SUCCESS: {
            return {
                ...state,
                orderRequest: false,
                orderFailed: false,
                order: {
                    ...state.order,
                    number: action.number
                }

            }
        }

        default: {
            return state;
        }

    }
};