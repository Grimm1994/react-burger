import React, {Component} from 'react';
import {Logo} from '@ya.praktikum/react-developer-burger-ui-components';
import {BurgerIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ListIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import {ProfileIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyles from './app-header.module.css';
import styles from '../app/app.module.css';

class AppHeader extends Component {
    fontRegular = 'text_type_main-default';

    render() {
        return (
            <header className={headerStyles.header}>
                <div className={`${styles.wrapper} ${styles.alignCenter}`}>
                    <div className={headerStyles.wrapperInner}>
                        <nav>
                            <ul className={headerStyles.menu}>
                                <li className={this.fontRegular}>
                                    <a href="#" className={`${headerStyles.item} ${headerStyles.active}`}>
                                        <BurgerIcon type="primary"/>
                                        <span>Конструктор</span>
                                    </a>
                                </li>
                                <li className={this.fontRegular}>
                                    <a href="#" className={headerStyles.item}>
                                        <ListIcon type="primary"/>
                                        <span>Лента заказов</span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        <a className={headerStyles.logo} href="/">
                            <Logo/>
                        </a>
                    </div>
                    <a href="#" className={`${headerStyles.profile} ${this.fontRegular}`}>
                        <ProfileIcon type="primary"/>
                        <span>Личный кабинет</span>
                    </a>
                </div>
            </header>
        );
    }
}


export default AppHeader;