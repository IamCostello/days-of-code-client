import React, {
  createContext,
  SetStateAction,
  Dispatch,
  FC,
  useEffect,
  useState,
} from "react";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import axiosClient, {
  addAuthTokenInterceptor,
  ejectAuthTokenInterceptor,
} from "../config/axios";
import axios, { AxiosInstance } from "axios";

type AuthStatus = [user: firebase.User | null, loading: boolean];

type CurrentUser = firebase.User | null;

export const AuthContext = React.createContext<AuthStatus>([null, true]);

export const AuthStateProvider: FC = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoading(false);

      if (user) {
        setUser(user);

        user.getIdToken(true).then((token) => {
          addAuthTokenInterceptor(token);
        });
      } else {
        setUser(null);
        ejectAuthTokenInterceptor();
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={[user, loading]}>
      {children}
    </AuthContext.Provider>
  );
};
