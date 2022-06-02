import API from "../../utils/api";

export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";

const getOrderNumberRequest = () => {
    return {
        type: GET_ORDER_NUMBER_REQUEST
    }
}

const getOrderNumberFailed = () => {
    return {
        type: GET_ORDER_NUMBER_FAILED
    }
}

const getOrderNumberSuccess = number => {
    return {
        type: GET_ORDER_NUMBER_SUCCESS,
        number
    }
}

export const createOrder = order => dispatch => {
    dispatch(getOrderNumberRequest())

    API.createOrder("/orders", order).then(response => {
        if (response.success) {
            dispatch(getOrderNumberSuccess(response.order.number));
        } else {
            dispatch(getOrderNumberFailed());
        }
    }).catch(err => {
        dispatch(getOrderNumberFailed());
    })
}