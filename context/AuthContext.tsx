import { createContext, useState, useEffect } from "react";

type Context = {
  loggedInUser: any;
  setLoggedInUser: any;
};

const user: Context = { loggedInUser: "", setLoggedInUser: "" };

const AuthContext = createContext(user);

export const AuthProvider = ({ children }: { children: any }) => {
  const [value, setValue] = useState("");

  return (
    <AuthContext.Provider
      value={{ loggedInUser: value, setLoggedInUser: setValue }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
