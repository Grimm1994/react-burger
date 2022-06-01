import React from 'react';
import styles from "./profile-navbar.module.css";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileNavbar = ({ logoutHandle }) => {
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

ProfileNavbar.propTypes = {
    logoutHandle: PropTypes.func.isRequired,
};

export default ProfileNavbar;