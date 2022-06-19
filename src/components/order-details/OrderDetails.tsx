import React, { FC, ReactElement } from 'react';
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import styles from './order-details.module.css';
import { useSelector } from "react-redux";

const OrderDetails: FC = (): ReactElement => {
    const { order } = useSelector((store: any) => store.order);

    return (
        <div className={`${styles.card} pt-20 pb-20`}>
            <h3 className={`${styles.order} text text_type_digits-large mb-8`}>{order?.number}</h3>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <div className={`${styles.iconBg} mb-15`}>
                <div className={styles.icon}>
                    <CheckMarkIcon type="primary"/>
                </div>
            </div>
            <p className="text text_type_main-default mb-2">
                Ваш заказ начали готовить
            </p>
            <p className="text text_type_main-default text_color_inactive">
                Дождитесь готовности на орбитальной станции
            </p>
        </div>
    );

}

export default OrderDetails;