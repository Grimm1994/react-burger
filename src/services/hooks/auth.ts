import { useSelector } from "./index";
import { TUseAuth } from "../../utils/types";

export const useAuth = (): TUseAuth  => {
    const token = localStorage.getItem("token");
    const { user, error, loading } = useSelector((store) => store.user);

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