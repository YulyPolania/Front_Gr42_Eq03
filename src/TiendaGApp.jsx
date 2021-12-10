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
  const [sede, setSede] = useState({
    name: "None",
    label: "none",
    value: 0,
    baseURL: "",
  });
  const [listSedes, setListSedes] = useState([]);
  const [alert, setAlert] = useState({
    openAlert: false,
    severity: "success",
    message: "",
  });

  const logout = () => {
    setTitle("TiendaG");
    setSede({
      name: "None",
      label: "none",
      value: 0,
      baseURL: "http://localhost:3001/",
    });
    setListSedes([]);
    dispatch({
      type: types.logout,
    });
    if (alert.severity === "success") {
      setAlert({
        openAlert: true,
        severity: "success",
        message: "Sesíon cerrada con éxito!",
      });
    }
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    let sedesList = [];
    user.sedes?.forEach((s) => {
      let value = 0;
      let label = "";
      let baseURL = "";
      s === "Bogota"
        ? (value = 1) &&
          (label = "Bogotá") &&
          (baseURL = "http://localhost:3001/")
        : s === "Medellin"
        ? (value = 2) &&
          (label = "Medellín") &&
          (baseURL = "http://localhost:3002/")
        : s === "Cali"
        ? (value = 3) &&
          (label = "Cali") &&
          (baseURL = "http://localhost:3003/")
        : (value = 0) &&
          (label = "None") &&
          (baseURL = "http://localhost:3001/");
      sedesList.push({ name: s, value: value, label: label, baseURL: baseURL });
    });
    if (user.sedes?.length === 0) {
      const noneSede = {
        name: "none",
        vallue: 0,
        label: "none",
        baseURL: "http://localhost:3001/",
      };
      setSede(noneSede);
      setListSedes([noneSede]);
    } else {
      setSede(sedesList[0]);
      setListSedes(sedesList);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        dispatch,
        title,
        setTitle,
        logout,
        alert,
        setAlert,
        setSede,
        sede,
        listSedes,
        setListSedes,
      }}
    >
      <AppRouter />
    </AuthContext.Provider>
  );
};
