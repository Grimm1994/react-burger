import React from "react";
import styles from "./header-menu.module.css";
import { BurgerIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const HeaderMenu = () => {
    return (
        <nav>
            <ul className={ styles.menu }>
                <li className="text_type_main-default pt-4 pb-4 pr-5 pl-5">
                    <NavLink
                        exact
                        to="/"
                        className={ styles.item }
                        activeClassName={ styles.active }
                    >
                        <BurgerIcon type="secondary"/>
                        <span>Конструктор</span>
                    </NavLink>
                </li>
                <li className="text_type_main-default pt-4 pb-4 pr-5 pl-5">
                    <NavLink
                        to="/orders"
                        className={ styles.item }
                        activeClassName={ styles.active }
                    >
                        <ListIcon type="secondary"/>
                        <span>Лента заказов</span>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu;