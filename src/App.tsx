import { useDisclosure } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { Header } from "./components/sections/Header";
import { SideBar } from "./components/sections/SideBar";
import axiosClient from "./config/axios";
import { auth, providerGoogle } from "./config/firebase";
import { AuthContext } from "./context/auth";
import { Dashboard } from "./pages/Dashboard";

function App() {
  const [user, loading] = useContext(AuthContext);

  // const handleNewLogin = (token: string) => {
  //   axiosClient
  //     .post("/auth/signup", {}, { headers: { authtoken: token } })
  //     .then((response) => console.log(response));
  // };

  // const handleLoginWithGoogle = () => {
  //   return auth.signInWithPopup(providerGoogle).then((res) => {
  //     res.user?.getIdToken(true).then((r) => handleNewLogin(r));
  //   });
  // };

  // const handleLogout = () => {
  //   auth.signOut();
  // };

  const sendRequest = () => {
    axiosClient
      .get("/saved")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  // const { isOpen, onOpen, onClose } = useDisclosure();
  // // const [isOpen, setIsOpen] = useState(true);

  // const handleDrawerToggle = () => {
  //   if (isOpen) {
  //     onClose();
  //   } else {
  //     onOpen();
  //   }
  // };

  return (
    <>
      {/* {loading && "loading"}
      {user ? "User" : "Aint it chief"}
      <button onClick={sendRequest}>Send request</button>
      <button onClick={handleLoginWithGoogle}>Login</button>
      <button onClick={handleLogout}>Logout</button> */}

      <Dashboard />
    </>
  );
}

export default App;
