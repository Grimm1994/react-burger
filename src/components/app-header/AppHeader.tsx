import React, { FC, ReactElement } from "react";
import { Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderMenu from "./components/header-menu/HeaderMenu";
import { NavLink } from "react-router-dom";


const AppHeader: FC = (): ReactElement => {

    return (
        <header className={ `${ styles.header } pt-4 pb-4 mb-10` }>
            <div className={ `${ styles.wrapper } ${ styles.alignCenter }` }>
                <div className={styles.wrapperContainer}>
                    <div className={ styles.wrapperInner }>
                        <HeaderMenu/>
                        <NavLink className={ styles.logo } to="/">
                            <Logo/>
                        </NavLink>
                    </div>
                    <NavLink
                        to="/profile"
                        className={ `${ styles.profile } text_type_main-default pt-4 pb-4 pr-5 pl-5` }
                        activeClassName={ styles.active }
                    >
                        <ProfileIcon type="secondary"/>
                        <span>Личный кабинет</span>
                    </NavLink>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;