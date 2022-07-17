import { TFeedState, TIngredient, TUniqueIngredient, TUserData } from "./types";

export const bun: TIngredient = {
    _id: "60d3b41abdacab0026a733c7",
    calories: 222,
    carbohydrates: 222,
    fat: 323,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 228,
    proteins: 123,
    type: "bun",
    __v: 0,
}

export const sauce: TIngredient = {
    _id: "60d3b41abdacab0026a733c71",
    calories: 222,
    carbohydrates: 222,
    fat: 323,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Соус Spicy-X",
    price: 228,
    proteins: 123,
    type: "sauce",
    __v: 0,
}

export const main: TIngredient = {
    _id: "60d3b41abdacab0026a733c72",
    calories: 222,
    carbohydrates: 222,
    fat: 323,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Мясо бессмертных моллюсков Protostomia",
    price: 228,
    proteins: 123,
    type: "main",
    __v: 0,
}

export const bunUniq: TUniqueIngredient = {
    ...bun,
    uuid: "123"
}

export const sauceUniq: TUniqueIngredient = {
    ...sauce,
    uuid: "1234"
}

export const mainUniq: TUniqueIngredient = {
    ...main,
    uuid: "12345"
}

export const user: TUserData = {
    email: "test@test.com",
    name: "John"
}

export const wsMessage: Omit<TFeedState, 'wsConnected'> = {
    success: true,
    total: 1000,
    totalToday: 10,
    orders: [
        {
            _id: "123",
            ingredients: [
                "123123",
                "1231233"
            ],
            status: "done",
            name: "Супер мясной бургер",
            number: 11,
            createdAt: "2022-07-16",
            updateAt: "2022-07-16",
        }
    ]
}
