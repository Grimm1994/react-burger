import React, { FC, ReactElement, useEffect } from 'react';
import styles from "./feed.module.css";
import FeedOrderList from "../components/feed-order-list/FeedOrderList";
import FeedOrderInfo from "../components/feed-order-info/FeedOrderInfo";
import { useDispatch } from "../services/hooks";
import { wsConnectionClosed, wsConnectionStart } from "../services/actions/wsFeed";

const Feed: FC = (): ReactElement => {
    const dispatch = useDispatch();

    useEffect(() => {
       dispatch(wsConnectionStart());

       return () => {
           dispatch(wsConnectionClosed());
       }
    }, [dispatch]);

    return (
        <>
            <FeedOrderList/>
            <FeedOrderInfo/>
        </>
    );
};

export default Feed;