import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import styles from "./index.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../services/hooks/auth";

const ForgotPassword: FC = (): ReactElement => {
    const { isAuth } = useAuth();

    const history = useHistory();
    const [value, setValue] = useState<string>("");
    const [error, setError] = useState<string>("");

    const resetPassword = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (value) {
            API.resetPassword("/password-reset", value)
                .then(response => {
                    if (response.success) {
                        console.log(response);
                        history.push({
                            pathname: "/reset-password",
                            state: true
                        });
                    }
                })
        } else {
            setError("Введите e-mail")
        }
    }

    useEffect(() => {
        isAuth() && history.push("/")
    }, [isAuth, history])

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.inner }>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <form className={ `${ styles.form } mb-20` } onSubmit={ resetPassword }>
                    <div className="mb-6">
                        <Input
                            type={ 'text' }
                            placeholder={ 'Укажите e-mail' }
                            onChange={ (e) => setValue(e.target.value) }
                            value={ value }
                            error={ !!error}
                            name={ 'email' }
                            errorText={error}
                        />
                    </div>
                    <Button type="primary" size="medium" htmlType="submit">
                        Восстановить
                    </Button>
                </form>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;