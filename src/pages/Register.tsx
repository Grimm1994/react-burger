import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import styles from "./index.module.css";
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../services/actions/user";
import { useAuth } from "../services/hooks/auth";
import { TRegisterState } from "../utils/types";

const Register: FC = (): ReactElement => {
    const { registerErrorMessage } = useSelector((store: any) => store.user);
    const { isAuth } = useAuth();
    const history = useHistory();
    const [form, setValue] = useState<TRegisterState>({ name: "", email: "", password: "" });
    const dispatch = useDispatch();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        isAuth() && history.push("/")
    }, [isAuth, history])

    const registerUser = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch(createUser(form));
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.inner }>
                <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
                <form className={ `${ styles.form } mb-20` } onSubmit={ registerUser }>
                    <div className="mb-6">
                        <Input
                            type={ 'text' }
                            placeholder={ 'Имя' }
                            onChange={ onChange }
                            value={ form.name }
                            name={ 'name' }
                        />
                    </div>
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
                    { registerErrorMessage && (
                        <div className="text text_type_main-default mb-4"
                             style={ { color: "red", textAlign: "left" } }>
                            { registerErrorMessage }
                        </div>
                    ) }
                    <Button type="primary" size="medium">
                        Зарегистрироваться
                    </Button>
                </form>
                <p className="text text_type_main-default text_color_inactive">
                    Уже зарегистрированы? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;