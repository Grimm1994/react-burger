import React, { useEffect, useState } from 'react';
import styles from "./index.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
    const history = useHistory();
    const { state } = useLocation();

    const [form, setValue] = useState({ password: "", token: "" });
    const [isHide, setIsHide] = useState(true);
    const [error, setError] = useState("");

    const onChange = e => {
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        !state && history.push("/")
    }, [state, history])

    const updatePassword = e => {
        e.preventDefault();

        API.updatePassword("/password-reset/reset", form).then(response => {
            response.success && history.push("/login")
        }).catch(async err => {
            const res = await err;

            setError(res.message);
        })
    }

    return (
        <div className={ styles.wrapper }>
            <div className={ styles.inner }>
                <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
                <form className={ `${ styles.form } mb-20` } onSubmit={updatePassword}>
                    <div className="mb-6">
                        <Input
                            type={ isHide ? 'password' : "text" }
                            placeholder={ 'Введите новый пароль' }
                            onChange={ onChange }
                            value={ form.password }
                            name={ 'password' }
                            icon={ isHide ? "ShowIcon" : "HideIcon" }
                            onIconClick={ () => setIsHide(!isHide) }
                        />
                    </div>
                    <div className="mb-6">
                        <Input
                            type={ 'text' }
                            placeholder={ 'Введите код из письма' }
                            onChange={ onChange }
                            value={ form.token }
                            name={ 'token' }
                        />
                    </div>
                    { error && (
                        <div className="text text_type_main-default mb-4"
                             style={ { color: "red", textAlign: "left" } }>
                            { error }
                        </div>
                    ) }
                    <Button type="primary" size="medium" htmlType="submit">
                        Сохранить
                    </Button>
                </form>
                <p className="text text_type_main-default text_color_inactive">
                    Вспомнили пароль? <Link to="/login">Войти</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;