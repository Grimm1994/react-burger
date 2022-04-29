import React from "react";
import styles from "./header-menu.module.css";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const HeaderMenu = () => {
    return (
        <nav>
            <ul className={styles.menu}>
                <li className="text_type_main-default pt-4 pb-4 pr-5 pl-5">
                    <a href="#" className={`${styles.item} ${styles.active}`}>
                        <BurgerIcon type="primary"/>
                        <span>Конструктор</span>
                    </a>
                </li>
                <li className="text_type_main-default pt-4 pb-4 pr-5 pl-5">
                    <a href="#" className={styles.item}>
                        <ListIcon type="secondary"/>
                        <span>Лента заказов</span>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default HeaderMenu;