import React, { FC, useEffect, useState } from "react";
import firebase from "firebase";
import { auth } from "../config/firebase";
import {
  addAuthTokenInterceptor,
  ejectAuthTokenInterceptor,
} from "../config/axios";
import { useQueryClient } from "react-query";

type AuthStatus = [user: firebase.User | null, loading: boolean];

type CurrentUser = firebase.User | null;

export const AuthContext = React.createContext<AuthStatus>([null, true]);

export const AuthStateProvider: FC = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const queryClient = useQueryClient();

  useEffect(() => {
    auth.onAuthStateChanged((userData) => {
      if (userData) {
        userData.getIdToken(true).then((token) => {
          addAuthTokenInterceptor(token);
          setUser(userData);
          setLoading(false);
        });
      } else {
        queryClient.removeQueries("articles");
        setUser(null);
        ejectAuthTokenInterceptor();
        setLoading(false);
      }
    });
  }, [queryClient]);

  return (
    <AuthContext.Provider value={[user, loading]}>
      {children}
    </AuthContext.Provider>
  );
};
