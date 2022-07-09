import React, { FC, ReactElement } from 'react';
import styles from "./profile-navbar.module.css";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import { logout } from "../../services/actions/user";
import { useDispatch } from "../../services/hooks";

const ProfileNavbar: FC = (): ReactElement => {
    const location = useLocation();

    const history = useHistory();

    const dispatch = useDispatch();

    const toggleClassName = (e: string) => {
        return location.pathname === e ? 'text text_type_main-medium' : 'text text_type_main-medium text_color_inactive'
    }

    const logoutHandle = (): void => {
        dispatch(logout());

        history.push("/login");
    }

    return (
        <aside className={ `${ styles.sidebar } mr-20` }>
            <nav className={ styles.navbar }>
                <NavLink
                    to="/profile"
                    className={ `text text_type_main-medium ${ styles.navLink }` }
                    activeClassName={ styles.active }
                ><span className={toggleClassName("/profile")}>Профиль</span></NavLink>
                <NavLink
                    to="/profile/orders"
                    className={ `text text_type_main-medium ${ styles.navLink }` }
                    activeClassName={ styles.active }
                ><span className={toggleClassName("/profile/orders")}>История заказов</span></NavLink>
                <button onClick={ logoutHandle }
                        className={ `text text_type_main-medium ${ styles.navLink }` }>Выход
                </button>
            </nav>
            <p className="text text_type_main-default text_color_inactive mt-20"
               style={ { opacity: "0.4" } }>
                В этом разделе вы можете изменить свои персональные данные
            </p>
        </aside>
    );
};

export default ProfileNavbar;