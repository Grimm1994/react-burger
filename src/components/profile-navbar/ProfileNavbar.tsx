import React, { FC, ReactElement } from 'react';
import styles from "./profile-navbar.module.css";
import { NavLink } from "react-router-dom";

const ProfileNavbar: FC<{ logoutHandle: () => void }> = ( { logoutHandle } ): ReactElement => {
    return (
        <aside className={ `${ styles.sidebar } mr-20` }>
            <nav className={ styles.navbar }>
                <NavLink to="/profile" className={ `text text_type_main-medium ${ styles.navLink }` }
                         activeClassName={ styles.active }>Профиль</NavLink>
                <NavLink to="/profile/orders" className={ `text text_type_main-medium ${ styles.navLink }` }
                         activeClassName={ styles.active }>История
                    заказов</NavLink>
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