import { createContext, useCallback, useEffect, useState } from "react";
import { postRequest } from "../utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const baseUrl = "http://localhost:5000/api";
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: ""
    });

    console.log("User:  ", user);

    useEffect(() => {
        const user = localStorage.getItem("User");

        setUser(JSON.parse(user));
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, [])

    const registerUser = useCallback(async(e) => {
        e.preventDefault();

        setIsRegisterLoading(true);
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))

        setIsRegisterLoading(false);

        if(response.error) {
            return setRegisterError(response);
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);

    }, [registerInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    }, [])

    return (
        <AuthContext.Provider value = {{
            user,
            registerInfo,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            logoutUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}