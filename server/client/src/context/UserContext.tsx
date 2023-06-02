import React, { createContext } from "react";
import { TUserContext } from "../types";

const initialState = {
  state: {
    name: "",
    profile: "",
    email: "",
    token: "",
  },
  setState: {
    setUser: (payload: TUserContext | null) => {},
  },
};

const UserContext = createContext(initialState);

export default UserContext;
