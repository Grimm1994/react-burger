import React, { FC, ReactElement, useEffect } from 'react';
import FeedOrderList from "../components/feed-order-list/FeedOrderList";
import { useDispatch } from "../services/hooks";
import { wsConnectionClosed, wsConnectionStart } from "../services/actions/ws";
import styles from "./profile.module.css";
import ProfileNavbar from "../components/profile-navbar/ProfileNavbar";
import { useAuth } from "../services/hooks/auth";

const ProfileOrders: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const { token } = useAuth();

    useEffect(() => {
        dispatch(wsConnectionStart(`?token=${token}`));

        return () => {
            dispatch(wsConnectionClosed());
        }
    }, [dispatch, token]);

    return (
        <div className={ styles.wrapper }>
            <ProfileNavbar/>
            <FeedOrderList/>
        </div>
    );
};

export default ProfileOrders;