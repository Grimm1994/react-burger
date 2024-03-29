import { Location } from "history";
import { ReactNode } from "react";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "../services/actions/ws";

export type TIngredient = {
    _id: string,
    name: string,
    type: string,
    proteins?: number,
    fat?: number,
    carbohydrates?: number,
    calories?: number,
    price: number,
    image: string,
    image_mobile?: string,
    image_large?: string,
    __v?: number
};

export type TOrder = {
    number: number
}

export type TUniqueIngredient = {
    uuid: string
} & TIngredient

export type TConstructorItem = {
    item: TUniqueIngredient,
    index: number,
    sortIngredient: (dragIndex: number, hoverIndex: number) => void;
}

export type TLocation = {
    from: Location;
    background?: Location;
};

export type TConstructorTotal = {
    bun: TUniqueIngredient,
    items: ReadonlyArray<TUniqueIngredient>
}

export type TIngredientsTabs = {
    [name: string]: string
}

export type TIngredientsTabsRefs = {
    [name: string]: any
}

export type TModal = {
    onClose: () => void,
    children: ReactNode
}

export type TProtectedRoute = {
    [name: string]: any,
    children: ReactNode
}

export type TUseAuth = {
    isAuth: () => boolean,
    token: string | null,
    user: TUserData,
    error: string,
    loading: boolean
}

export type TUserData = {
    email: string,
    name: string
}

export type TLoginState = {
    email: string,
    password: string
}

export type TRegisterState = {
    name: string
} & TLoginState

export type TUserDataState = {
    email: string,
    password: string,
    name: string
}

export type TResetPasswordState = {
    password: string,
    token: string
}

export type TUserDataEditAbleState = {
    [name: string]: boolean,
}

export type TWsFeedOrder = {
    _id: string,
    ingredients: string[],
    status: 'done' | 'pending' | 'created',
    name: string,
    number: number,
    createdAt?: string,
    updateAt?: string,
}

export type TFeedState = {
    wsConnected: boolean,
    success: boolean,
    total: number,
    totalToday: number,
    orders: TWsFeedOrder[]
}

export type TSocketMiddlewareActions = {
    readonly onInit: typeof WS_CONNECTION_START
    readonly onOpen: typeof WS_CONNECTION_SUCCESS
    readonly onError: typeof WS_CONNECTION_ERROR
    readonly onClose: typeof WS_CONNECTION_CLOSED
    readonly onMessage: typeof WS_GET_MESSAGE
}

export type TModalOverlay = Omit<TModal, 'children'>