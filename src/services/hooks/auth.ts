import { useSelector } from "./index";
import { TUseAuth } from "../../utils/types";

export const useAuth = (): TUseAuth  => {
    const token = localStorage.getItem("token");
    const { user, registerErrorMessage, loginErrorMessage, loading } = useSelector((store) => store.user);

    const isAuth = () => {
        return !!(token || user)
    };

    const error = registerErrorMessage || loginErrorMessage;

    return {
        isAuth,
        token,
        user,
        error,
        loading
    }
}