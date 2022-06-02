import { useSelector } from "react-redux";

export const useAuth = () => {
    const token = localStorage.getItem("token");
    const { user, error, loading } = useSelector(store => store.user);

    const isAuth = () => {
        return !!(token || user)
    };

    return {
        isAuth,
        token,
        user,
        error,
        loading
    }
}