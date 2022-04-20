import React from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import appStyles from '../app/app.module.css';


const AppHeader = () => {

    return (
        <header className={`${styles.header} pt-4 pb-4 mb-10`}>
            <div className={`${appStyles.wrapper} ${appStyles.alignCenter}`}>
                <div className={styles.wrapperInner}>
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
                                    <ListIcon type="primary"/>
                                    <span>Лента заказов</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <a className={styles.logo} href="/">
                        <Logo/>
                    </a>
                </div>
                <a href="#" className={`${styles.profile} text_type_main-default pt-4 pb-4 pr-5 pl-5`}>
                    <ProfileIcon type="primary"/>
                    <span>Личный кабинет</span>
                </a>
            </div>
        </header>
    );
};

export default AppHeader;