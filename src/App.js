import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Heading from "./components/Heading";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import MedMain from "./components/MedMain";
import BPMain from "./components/BloodPressureMain";

import "./public/css/auth.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkForToken() {
    // Checks for the access token in the browser and returns the 
    // user to either main if true or login if false.
    const token = sessionStorage.getItem("Token");

    if (token) {
      setIsLoggedIn(true);
      window.location = "/main/";
    } else {
      window.location = "/login/";
    }
  }

  return (
    <>
      <BrowserRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path={"/"}>
              {isLoggedIn ? (
                <Redirect to="/main/" />
              ) : (
                <Redirect to="/login/" />
              )}
            </Route>

            <Route exact path={"/register/"}>
              <RegistrationPage checkForToken={checkForToken} />
            </Route>

            <Route exact path={"/login/"}>
              {isLoggedIn ? (
                <Redirect to="/main/" />
              ) : (
                <LoginPage checkForToken={checkForToken} />
              )}
            </Route>

            <Route exact path={"/main/"}>
              <Heading setLogin={setIsLoggedIn} />
              <MedMain />
            </Route>

            <Route exact path={"/bp/"}>
              <Heading setLogin={setIsLoggedIn} />

              {window.sessionStorage.getItem("Token") ? (
                <BPMain />
              ) : (
                <LoginPage />
              )}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
