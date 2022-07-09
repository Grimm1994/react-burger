import React, { FC, ReactElement, useEffect } from 'react';
import FeedOrderList from "../components/feed-order-list/FeedOrderList";
import FeedOrderInfo from "../components/feed-order-info/FeedOrderInfo";
import { useDispatch } from "../services/hooks";
import { wsConnectionClosed, wsConnectionStart } from "../services/actions/ws";
import styles from "./feed.module.css";

const Feed: FC = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsConnectionStart("/all"));

        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [dispatch]);

    return (
        <>
            <div className={ styles.container }>
                <h1 className={ `text text_type_main-large mb-5 ${ styles.title }` }>Лента заказов</h1>
                <FeedOrderList/>
            </div>
            <div className={`${ styles.container } mt-15` }>
                <FeedOrderInfo/>
            </div>
        </>
    );
};

export default Feed;