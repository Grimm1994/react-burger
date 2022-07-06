import React, { FC, ReactElement } from 'react';
import styles from "./feed-order-list.module.css";
import FeedOrderCard from "./feed-order-card/FeedOrderCard";

const FeedOrderList: FC = (): ReactElement => {
    return (
        <div className={styles.container}>
            <h1 className={ `text text_type_main-large mb-5 ${ styles.title }` }>Лента заказов</h1>
            <div className={styles.wrapper}>
                <FeedOrderCard/>
            </div>
        </div>
    );
};

export default FeedOrderList;