import React, { ReactNode, useState } from "react";

interface IContext {
  username: string;
  isAuth: boolean;
  logIn?: (userName: string) => void;
  logOut?: () => void;
}
// eslint-disable-next-line import/prefer-default-export
export const Context = React.createContext<IContext>({
  username: "",
  isAuth: false,
});

interface IAuthProvider {
  children: ReactNode;
}

export function AuthProvider(props: IAuthProvider) {
  const [user, setUser] = useState({ name: "", isAuth: false });
  function logIn(userName: string) {
    setUser({ name: userName, isAuth: true });
  }
  function logOut() {
    setUser({ name: "", isAuth: false });
  }

  return (
    <Context.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        username: user.name,
        isAuth: user.isAuth,
        logIn,
        logOut,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
