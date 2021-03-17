import { Center } from "@chakra-ui/layout";
import React, { FC } from "react";
import { LoginButton } from "../components/ui/LoginButton";
import axiosClient from "../config/axios";
import { auth, providerGoogle } from "../config/firebase";
import { FaGoogle } from "react-icons/fa";

export const SignIn: FC = () => {
  const handleNewLogin = (token: string) => {
    axiosClient.post("/auth/signup", {}, { headers: { authtoken: token } });
  };

  const handleLoginWithGoogle = () => {
    return auth.signInWithPopup(providerGoogle).then((res) => {
      res.user?.getIdToken(true).then((r) => handleNewLogin(r));
    });
  };

  return (
    <Center w="100%" h="100vh">
      <LoginButton
        providerName="Google"
        providerAction={handleLoginWithGoogle}
        providerIcon={<FaGoogle />}
      />
    </Center>
  );
};
