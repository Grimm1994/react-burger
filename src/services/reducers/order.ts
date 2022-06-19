import {
    GET_ORDER_NUMBER_SUCCESS,
    GET_ORDER_NUMBER_REQUEST,
    GET_ORDER_NUMBER_FAILED,
} from "../actions/order";


const initialState: any = {
    orderRequest: false,
    orderFailed: false,
    order: {
        number: null,
    },
}

export const orderReducer = (state = initialState, action: any) => {
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