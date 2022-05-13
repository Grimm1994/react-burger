import API from "../../utils/api";

export const GET_ORDER_NUMBER_SUCCESS = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_REQUEST = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_FAILED = "GET_ORDER_NUMBER_FAILED";


export const createOrder = (order) => dispatch => {
    dispatch({
        type: GET_ORDER_NUMBER_REQUEST
    })

    API.createOrder("/orders", order).then(response => {
        if (response.success) {
            dispatch({
                type: GET_ORDER_NUMBER_SUCCESS,
                number: response.order.number
            })
        } else {
            dispatch({
                type: GET_ORDER_NUMBER_FAILED
            })
        }
    }).catch(err => {
        dispatch({
            type: GET_ORDER_NUMBER_FAILED
        })
    })
}