import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import axiosInstance from "./util/axios";

import Heading from "./components/Heading";
import LoginPage from "./components/auth/LoginPage";
import RegistrationPage from "./components/auth/RegistrationPage";
import MedMain from "./components/MedMain";
import BPMain from "./components/BloodPressureMain";

import "./public/static/css/auth.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const history = useHistory();

  function checkForToken() {
    // Checks for the access token in browser storage and sets as default header.
    const token = sessionStorage.getItem("Token");

    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
      setIsLoggedIn(true);
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
                <LoginPage history={history} checkForToken={checkForToken} />
              )}
            </Route>

            <Route exact path={"/main/"}>
              {window.sessionStorage.getItem("Token") ? (
                <>
                  <Heading setLogin={setIsLoggedIn} />
                  <MedMain />
                </>
              ) : (
                <Redirect to="/login/" />
              )}
            </Route>

            <Route exact path={"/bp/"}>
              {window.sessionStorage.getItem("Token") ? (
                <>
                  <Heading setLogin={setIsLoggedIn} />
                  <BPMain />
                </>
              ) : (
                <Redirect to="/login/" />
              )}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
