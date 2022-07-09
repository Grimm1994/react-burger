import React, { ChangeEvent, FC, ReactElement, useCallback, useState } from "react";
import styles from "./index.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, Redirect, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "../services/hooks";
import { signIn } from "../services/actions/user";
import { useAuth } from "../services/hooks/auth";
import { TLocation, TLoginState } from "../utils/types";

const Login: FC = (): ReactElement => {
    const [form, setValue] = useState<TLoginState>({ email: "", password: "" });
    const { loginErrorMessage } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    const location = useLocation<TLocation>();
    const { state } = location;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const auth = useCallback((e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(signIn(form))
    }, [dispatch, form])


    if (isAuth()) {
        return (
            <Redirect
                to={ state?.from || '/' }
            />
        );
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.inner }>
                <h1 className="text text_type_main-medium mb-6">Вход</h1>
                <form className={ `${ styles.form } mb-20` } onSubmit={ auth }>
                    <div className="mb-6">
                        <Input
                            type={ 'text' }
                            placeholder={ 'E-mail' }
                            onChange={ onChange }
                            value={ form.email }
                            name={ 'email' }
                        />
                    </div>
                    <div className="mb-6">
                        <PasswordInput onChange={ onChange } value={ form.password } name={ 'password' }/>
                    </div>
                    { loginErrorMessage && (
                        <div className="text text_type_main-default mb-4"
                             style={ { color: "red", textAlign: "left" } }>
                            { loginErrorMessage }
                        </div>
                    ) }
                    <Button type="primary" size="medium">
                        Войти
                    </Button>
                </form>
                <p className="text text_type_main-default text_color_inactive mb-4">
                    Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
                </p>
                <p className="text text_type_main-default text_color_inactive">
                    Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;