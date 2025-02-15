import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import AuthContext from "../context/AuthContext";

const useLogout = () => {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        try {
            await apiClient.post(
                "/logout/",
                {},
                {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                }
            );
        } catch (error) {
            console.error("Logout failed", error);
        }

        setToken(null);
        navigate("/login");
    };

    return logout;
};

export default useLogout;
