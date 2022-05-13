import React from "react";
import { Logo, ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./app-header.module.css";
import HeaderMenu from "./components/header-menu/HeaderMenu";


const AppHeader = () => {

    return (
        <header className={ `${ styles.header } pt-4 pb-4 mb-10` }>
            <div className={ `${ styles.wrapper } ${ styles.alignCenter }` }>
                <div className={styles.wrapperContainer}>
                    <div className={ styles.wrapperInner }>
                        <HeaderMenu/>
                        <a className={ styles.logo } href="/">
                            <Logo/>
                        </a>
                    </div>
                    <a href="/" className={ `${ styles.profile } text_type_main-default pt-4 pb-4 pr-5 pl-5` }>
                        <ProfileIcon type="secondary"/>
                        <span>Личный кабинет</span>
                    </a>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;