import { Location } from "history";
import { ReactNode } from "react";

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
    bun: TIngredient,
    items: TIngredient[]
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
    user: TUserDataState,
    error: string,
    loading: boolean
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

export type TCookieProps = {
    [name: string]: any
}

export type TModalOverlay = Omit<TModal, 'children'>