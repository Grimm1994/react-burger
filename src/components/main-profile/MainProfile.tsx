import React, { ChangeEvent, FC, ReactElement, useCallback, useEffect, useState } from 'react';
import styles from "./main-profile.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import { TUserData, TUserDataEditAbleState, TUserDataState } from "../../utils/types";
import { updateUser } from "../../services/actions/user";

const MainProfile: FC<{user: TUserData}> = ({user}): ReactElement => {
    const dispatch = useDispatch();

    const [form, setValue] = useState<TUserDataState>({ name: "", email: "", password: "" });
    const [isChanged, setIsChanged] = useState<boolean>(false);

    useEffect(() => {
        if (user) {
            setValue({
                ...form,
                name: user.name,
                email: user.email
            })
        }
    }, [user])

    const [isEditAble, setIsEditAble] = useState<TUserDataEditAbleState>({ name: false, email: false, password: false });

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        setIsChanged(true);
        setValue({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isChanged) return false;

        dispatch(updateUser(form));

        for (const item in isEditAble) {
            isEditAble[item] = false
        }
    }

    const editHandle = useCallback((name: string) => {
        setIsEditAble({
            ...isEditAble,
            [name]: !isEditAble[name]
        })
    }, [isEditAble])


    const cancelHandle = () => {
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
        <form className={ styles.form } onSubmit={ onSubmit }>
            <div className="mb-6">
                <Input
                    type={ 'text' }
                    placeholder={ 'Имя' }
                    onChange={ onChange }
                    value={ form.name }
                    name={ 'name' }
                    icon={ isEditAble.name ? "CheckMarkIcon" : "EditIcon" }
                    onIconClick={ () => editHandle("name") }
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
                    onIconClick={ () => editHandle("email") }
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
                    onIconClick={ () => editHandle("password") }
                    disabled={ !isEditAble.password }
                />
            </div>
            <div className={ `${ styles.btnWrapper } mt-6` }>
                <Button type='secondary' size='medium' onClick={ cancelHandle }>Отмена</Button>
                <Button type='primary' size='medium'>Сохранить</Button>
            </div>
        </form>
    );
};

export default MainProfile;