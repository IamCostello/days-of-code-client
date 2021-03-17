import { Center, Spinner } from "@chakra-ui/react";
import React, { useContext } from "react";
import { Redirect } from "react-router";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth";
import { Dashboard } from "./pages/Dashboard";
import { LandingPage } from "./pages/LandingPage";
import { SignIn } from "./pages/SignIn";

function App() {
  const [user, loading] = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {!loading ? (
            user ? (
              <Redirect to="/dashboard" />
            ) : (
              <LandingPage />
            )
          ) : (
            <Center w="100vw" h="100vh">
              <Spinner />
            </Center>
          )}
        </Route>
        <Route path="/signin">
          {user ? <Redirect to="dashboard" /> : <SignIn />}
        </Route>
        <Route path="/dashboard">
          {!loading ? (
            user ? (
              <Dashboard />
            ) : (
              <Redirect to="/" />
            )
          ) : (
            <Center w="100vw" h="100vh">
              <Spinner />
            </Center>
          )}
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
