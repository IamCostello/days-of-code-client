import React, { useContext, useState } from "react";
import { Redirect, Router } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Header } from "./components/sections/Header";
import { SideBar } from "./components/sections/SideBar";
import axiosClient from "./config/axios";
import { auth, providerGoogle } from "./config/firebase";
import { AuthContext } from "./context/auth";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";
import { SignIn } from "./pages/SignIn";

function App() {
  const [user, loading] = useContext(AuthContext);

  const sendRequest = () => {
    axiosClient
      .get("/saved")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {!loading && (user ? <Redirect to="/dashboard" /> : <LandingPage />)}
        </Route>
        <Route path="/signin">
          {user ? <Redirect to="dashboard" /> : <SignIn />}
        </Route>
        <Route path="/dashboard">
          {!loading && (user ? <Dashboard /> : <Redirect to="/" />)}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
