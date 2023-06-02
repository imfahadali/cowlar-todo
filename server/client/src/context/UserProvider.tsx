import React, { createContext, useReducer } from "react";
import { TUserContext } from "../types";
import UserContext from "./UserContext";
import { actions, usePersistReducer } from "./UserReducer";

const UserProvider = ({ children }: any) => {
  // const [state, dispatch] = testR();
  const [state, dispatch] = usePersistReducer();
  // const [state, dispatch] = useReducer(reducer, initialState);

  const setState = {
    setUser: (payload: TUserContext) => {
      return dispatch({ type: actions.SET_USER, payload });
    },
  };

  return (
    <UserContext.Provider value={{ state, setState }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
