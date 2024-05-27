import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { baseUrl, postRequest } from "../utils/services";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [registerError, setRegisterError] = useState(null);
  const [isregisterLoading, setIsregisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);
  const [isloginLoading, setIsloginLoading] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });


  useEffect(()=>{
    const user = localStorage.getItem("user")
    setUser(JSON.parse(user))
  }, [])

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
  }, []);

  const loginUser = useCallback(async (e)=>{
    e.preventDefault()
    setIsloginLoading(true)
    setLoginError(null)
    const response = await postRequest(
      `${baseUrl}/user/login`,
      JSON.stringify(loginInfo)
    );
    setIsloginLoading(false)

    if(response.error){
      return setLoginError(response)
    }

    localStorage.setItem("user", JSON.stringify(response))
    setUser(response)

  }, [loginInfo])

  const registerUser = useCallback(async (e) => {
    e.preventDefault();

    setIsregisterLoading(true);
    setRegisterError(null);
    const response = await postRequest(
      `${baseUrl}/user/register`,
      JSON.stringify(registerInfo)
    );

    setIsregisterLoading(false);

    if (response.error) {
      return setRegisterError(response);
    }

    localStorage.setItem("User", JSON.stringify(response));
    setUser(response);
  }, [registerInfo]);

  const logoutUser = useCallback(()=>{
    localStorage.removeItem("user")
    setUser(null)
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isregisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        isloginLoading
      }}
    >
      {children}
    </Context.Provider>
  );
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};

