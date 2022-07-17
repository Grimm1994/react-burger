import API from "../../utils/api";
import { AppDispatch, AppThunk } from "../types";
import { updateToken } from "./user";

export const GET_ORDER_NUMBER_SUCCESS: "GET_ORDER_NUMBER" = "GET_ORDER_NUMBER";
export const GET_ORDER_NUMBER_REQUEST: "GET_ORDER_NUMBER_REQUEST" = "GET_ORDER_NUMBER_REQUEST";
export const GET_ORDER_NUMBER_FAILED: "GET_ORDER_NUMBER_FAILED" = "GET_ORDER_NUMBER_FAILED";

export type TGetOrderNumberRequest = {
    readonly type: typeof GET_ORDER_NUMBER_REQUEST,
}

export type TGetOrderNumberFailed = {
    readonly type: typeof GET_ORDER_NUMBER_FAILED,
}

export type TGetOrderNumberSuccess = {
    readonly type: typeof GET_ORDER_NUMBER_SUCCESS,
    readonly number: number
}

export type TOrderActions =
    | TGetOrderNumberRequest
    | TGetOrderNumberFailed
    | TGetOrderNumberSuccess

export const getOrderNumberRequest = (): TGetOrderNumberRequest => {
    return {
        type: GET_ORDER_NUMBER_REQUEST
    }
}

export const getOrderNumberFailed = (): TGetOrderNumberFailed => {
    return {
        type: GET_ORDER_NUMBER_FAILED
    }
}

export const getOrderNumberSuccess = ( number: number ): TGetOrderNumberSuccess => {
    return {
        type: GET_ORDER_NUMBER_SUCCESS,
        number
    }
}

export const createOrder = ( order: Array<string> ): AppThunk => ( dispatch: AppDispatch ) => {
    dispatch(getOrderNumberRequest())

    API.createOrder("/orders", order).then(response => {
        if (response.success) {
            dispatch(getOrderNumberSuccess(response.order.number));
        } else {
            dispatch(getOrderNumberFailed());
        }
    }).catch(async err => {
        await updateToken(err, () => {
            API.createOrder("/orders", order).then(response => {
                if (response.success) {
                    dispatch(getOrderNumberSuccess(response.order.number));
                } else {
                    dispatch(getOrderNumberFailed());
                }
            })
        });
    })
}