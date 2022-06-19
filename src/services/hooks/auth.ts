import { useSelector } from "react-redux";
import { TUseAuth } from "../../utils/types";

export const useAuth = (): TUseAuth  => {
    const token = localStorage.getItem("token");
    const { user, error, loading } = useSelector((store: any) => store.user);

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