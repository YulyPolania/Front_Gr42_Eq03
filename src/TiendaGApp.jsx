import React, { useReducer, useEffect, useState } from "react";
import { AppRouter } from "./routers/AppRouter";
import { AuthContext } from "./auth/AuthContext";
import { authReducer } from "./auth/authReducer";
import { types } from "./types/types";

const init = () => {
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const TiendaGApp = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);
  const [title, setTitle] = useState("TiendaG");

  const logout = () => {
    dispatch({
      type: types.logout,
    });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch, title, setTitle, logout}}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
