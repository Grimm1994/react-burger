import React, { FC, ReactElement } from 'react';
import styles from "./profile.module.css";
import ProfileNavbar from "../components/profile-navbar/ProfileNavbar";
import { useAuth } from "../services/hooks/auth";
import { Rings } from "react-loader-spinner";
import MainProfile from "../components/main-profile/MainProfile";

const Profile: FC = (): ReactElement => {
    const { user, loading } = useAuth();

    return (
        <div className={ styles.wrapper }>
            { loading ? (
                <Rings height={ 300 } width={ 300 } wrapperClass={ styles.loaderWrapper } color="#8585AD"/>
            ) : (
                <>
                    <ProfileNavbar/>
                    <MainProfile user={ user }/>
                </>
            ) }
        </div>
    );
};

export default Profile;