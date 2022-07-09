import React, { FC, Fragment, ReactElement } from 'react';
import styles from "./feed-order-list.module.css";
import FeedOrderCard from "./feed-order-card/FeedOrderCard";
import { useSelector } from "../../services/hooks";
import { TWsFeedOrder } from "../../utils/types";

const FeedOrderList: FC = (): ReactElement => {
    const { orders, wsConnected, success } = useSelector(store => store.feed);

    orders.sort(( a, b ) => b.number - a.number);

    return (
        <>
            { wsConnected && success ? (
                <div className={ styles.wrapper }>
                    { orders
                        ? orders.map(( order: TWsFeedOrder ) => (
                            <Fragment key={ order._id }>
                                <FeedOrderCard order={ order }/>
                            </Fragment>
                        ))
                        : <div>Здесь пока пусто</div>
                    }
                </div>
            ) : (
                <div>Загрузка...</div>
            ) }

        </>
    );
};

export default FeedOrderList;