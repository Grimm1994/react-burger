import React, { useCallback, useEffect, useState } from 'react';
import styles from "./profile.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, updateUser } from "../services/actions/user";
import ProfileNavbar from "../components/profile-navbar/ProfileNavbar";
import { useAuth } from "../services/hooks/auth";
import { Rings } from "react-loader-spinner";

const Profile = () => {
    const { user, loading } = useAuth();
    const history = useHistory();

    const dispatch = useDispatch();

    const [form, setValue] = useState({ name: "", email: "", password: "" });
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (user) {
            setValue({
                ...form,
                name: user.name,
                email: user.email
            })
        }
    }, [user])

    const [isEditAble, setIsEditAble] = useState({ name: false, email: false, password: false });

    const onChange = e => {
        e.preventDefault();

        setIsChanged(true);
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!isChanged) return false;

        dispatch(updateUser(form));

        for (const item in isEditAble) {
            isEditAble[item] = false
        }
    }

    const editHandle = useCallback((e, name) => {
        e.preventDefault();

        setIsEditAble({
            ...isEditAble,
            [name]: !isEditAble[name]
        })
    }, [isEditAble])

    const logoutHandle = (e) => {
        e.preventDefault();

        dispatch(logout());

        history.push("/login");
    }

    const cancelHandle = e => {
        e.preventDefault();

        setValue({
            ...form,
            name: user.name,
            email: user.email
        })

        for (const item in isEditAble) {
            isEditAble[item] = false
        }
    }

    return (
        <div className={ styles.wrapper }>
            {loading ? (
                <Rings height={300} width={300} wrapperClass={styles.loaderWrapper} color="#8585AD" />
            ) : (
                <>
                    <ProfileNavbar logoutHandle={ logoutHandle }/>
                    <form className={ styles.form } onSubmit={ onSubmit }>
                        <div className="mb-6">
                            <Input
                                type={ 'text' }
                                placeholder={ 'Имя' }
                                onChange={ onChange }
                                value={ form.name }
                                name={ 'name' }
                                icon={ isEditAble.name ? "CheckMarkIcon" : "EditIcon" }
                                onIconClick={ (e) => editHandle(e, "name") }
                                disabled={ !isEditAble.name }
                            />
                        </div>
                        <div className="mb-6">
                            <Input
                                type={ 'text' }
                                placeholder={ 'E-mail' }
                                onChange={ onChange }
                                value={ form.email }
                                name={ 'email' }
                                icon={ isEditAble.email ? "CheckMarkIcon" : "EditIcon" }
                                onIconClick={ (e) => editHandle(e, "email") }
                                disabled={ !isEditAble.email }
                            />
                        </div>
                        <div>
                            <Input
                                type={ 'password' }
                                placeholder={ 'Пароль' }
                                onChange={ onChange }
                                value={ form.password }
                                name={ 'password' }
                                icon={ isEditAble.password ? "CheckMarkIcon" : "EditIcon" }
                                onIconClick={ (e) => editHandle(e, "password") }
                                disabled={ !isEditAble.password }
                            />
                        </div>
                        <div className={ `${ styles.btnWrapper } mt-6` }>
                            <Button type='secondary' size='medium' onClick={ cancelHandle }>Отмена</Button>
                            <Button type='primary' size='medium'>Сохранить</Button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};

export default Profile;