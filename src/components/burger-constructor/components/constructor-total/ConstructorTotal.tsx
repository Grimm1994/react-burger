import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styles from "./constructor-total.module.css";
import { Button, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../../../modal/Modal";
import OrderDetails from "../../../order-details/OrderDetails";
import { clearConstructor, setTotalSum } from "../../../../services/actions/cart";
import { createOrder } from "../../../../services/actions/order";
import { useDispatch, useSelector } from "../../../../services/hooks";
import { TConstructorTotal } from "../../../../utils/types";
import { TailSpin } from "react-loader-spinner";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../../../services/hooks/auth";

const ConstructorTotal: FC<TConstructorTotal> = ({ bun, items }): ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuth } = useAuth();

    const { totalSum } = useSelector((store) => store.cart)
    const { orderFailed, orderRequest } = useSelector((store) => store.order)

    const [isModal, setIsModal] = useState<boolean>(false);

    const getSum = useCallback(() => {
        let bunSum = 0
        if (bun.price) {
            bunSum = bun.price * 2;
        }

        const ingredientsSum = items.filter(item => item.type !== "bun")
            .reduce((acc, current) => acc += current.price, 0)

        return bunSum + ingredientsSum;
    }, [items, bun])

    useEffect(() => {
        dispatch(setTotalSum(getSum()))
    }, [dispatch, getSum])

    const createNewOrder = () => {
        if (!isAuth()) {
            history.push("/login");
        }

        const toppingIds = items?.map(item => item._id);

        const orderData = [
            bun._id,
            ...toppingIds,
            bun._id,
        ]

        dispatch(createOrder(orderData));
        setIsModal(true)
    }
    
    const renderDetails = () => {
        if (orderFailed) {
            return (
                <>Что-то пошло не так...</>
            )
        }

        return (
            <Modal onClose={ closeModal }>
                <OrderDetails/>
            </Modal>
        )
    }

    const closeModal = () => {
        setIsModal(false);

        dispatch(clearConstructor());
    }

    return (
        <>
            <div className={ styles.btnBlock }>
                <div className="mr-10">
                    <span className="text text_type_digits-medium mr-2">{ totalSum }</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button name="test-order-button" type="primary" size="large" onClick={ createNewOrder }>
                    <div data-test="order-button" className={ styles.btnInner }>
                        { orderRequest && <TailSpin wrapperClass={ styles.spinner } color="#fff"/> }
                        Оформить заказ
                    </div>
                </Button>
            </div>

            { !orderRequest && isModal && renderDetails() }
        </>
    );
};

export default ConstructorTotal;