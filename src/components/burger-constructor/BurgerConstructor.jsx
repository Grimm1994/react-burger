import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import Modal from "../modal/Modal";
import OrderDetails from "../order-details/OrderDetails";
import { AppContext } from "../../services/contexts/AppContext";
import API from "../../utils/api";


const BurgerConstructor = () => {
    const { state, dispatch } = useContext(AppContext);
    const { ingredients } = state;

    const [isModal, setIsModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    const bun = ingredients?.filter(item => item.type === "bun")[0];

    const createOrder = async () => {
        setIsLoading(true);

        const toppingIds = ingredients?.map(item => item._id);

        const orderData = [
            bun._id,
            ...toppingIds,
            bun._id,
        ]


        await API.createOrder("/orders", orderData).then(response => {
            if (response.success) {
                dispatch({ type: "setOrderNumber", payload: response.order.number })
            } else {
                setError(true);
            }
        }).catch(err => {
            console.log(err);
            setError(true);
        })

        setIsModal(true);
        setIsLoading(false);
    }

    const getSum = useCallback(() => {
        const bunSum = bun.price * 2;

        const ingredientsSum = ingredients?.filter(item => item.type !== "bun")
            .reduce((acc, current) => acc += current.price, 0)

        return bunSum + ingredientsSum;
    }, [ingredients, bun])

    useEffect(() => {
        dispatch({ type: "setTotalSum", payload: getSum() })
    }, [ingredients, dispatch, getSum])

    const renderDetails = () => {
        if (error) {
            return (
                <>Что-то пошло не так...</>
            )
        }

        if (isLoading) {
            return (
                <>Загрузка...</>
            )
        }

        return <OrderDetails/>
    }

    const renderModal = () => {

        return (
            <Modal onClose={() => setIsModal(false)}>
                {renderDetails()}
            </Modal>
        )


    }

    return (
        <div className={`${styles.wrapper} pl-4 pr-4`}>
            {bun &&
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            }

            <div className={styles.wrapperInner}>
                {ingredients.map(item =>
                    item.type !== 'bun' &&
                    <div className={styles.item} key={item._id}>
                        <DragIcon type="primary"/>
                        <ConstructorElement
                            text={item.name}
                            price={item.price}
                            thumbnail={item.image}
                        />
                    </div>
                )}
            </div>
            {bun &&
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    thumbnail={bun.image}
                />
            }

            <div className={styles.btnBlock}>
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">{state.totalSum}</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large" onClick={() => createOrder()}>
                    Оформить заказ
                </Button>
            </div>
            {isModal && renderModal()}
        </div>
    );
};


export default BurgerConstructor;