import React, { FC, ReactElement } from 'react';
import styles from "./feed-order-info.module.css";
import { useSelector } from "../../services/hooks";

const FeedOrderInfo: FC = (): ReactElement => {
    const { totalToday, total, orders } = useSelector(store => store.feed);

    const doneOrderNumbers = orders.filter(e => e.status === "done").map(order => order.number);
    const pendingOrderNumbers = orders.filter(e => e.status === "pending").map(order => order.number);

    return (
        <>
            <div className={ styles.containerInner }>
                <div className={ styles.wrapper }>
                    <h2 className="text text_type_main-medium">Готовы:</h2>
                    <div className={ `${ styles.wrapperInner } mt-6` }>
                        { doneOrderNumbers.slice(0, 10).map(( number, index ) =>
                            <div key={ index }
                                 className={ `text text_type_digits-default ${ styles.number } ${ styles.numberDone }` }>{ number }</div>
                        ) }
                    </div>
                </div>
                <div className={ styles.wrapper }>
                    <h2 className="text text_type_main-medium">В работе:</h2>
                    <div className={ `${ styles.wrapperInner } mt-6` }>
                        { pendingOrderNumbers.slice(0, 20).map(( number, index ) =>
                            <div key={ index }
                                 className={ `text text_type_digits-default ${ styles.number }` }>{ number }</div>
                        ) }
                    </div>
                </div>
            </div>
            <div className={ `${styles.wrapper} mt-15` }>
                <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
                <p className={ `text text_type_digits-large ${ styles.lightNumber }` }>{ total }</p>
            </div>
            <div className={ `${styles.wrapper} mt-15` }>
                <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
                <p className={ `text text_type_digits-large ${ styles.lightNumber }` }>{ totalToday }</p>
            </div>
        </>
    );
};

export default FeedOrderInfo;