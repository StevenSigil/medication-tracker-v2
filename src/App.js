import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Main from './components/Main';

import axiosInstance from "./util/axios";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkForToken() {
    // Checks for a token in the broser and returns the
    //   user to either main if true or login if false.
    const token = sessionStorage.getItem("Token");
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = "Token " + token;
      setIsLoggedIn(true);
      return <Redirect to="/main/" />;
    } else {
      return <Redirect to="/login/" />;
    }
  }

  return (
    <>
      <BrowserRouter basename="/">
        <div className="App">
          <Switch>
            <Route exact path={"/login/"}>
              {isLoggedIn ? (
                <Redirect to="/main/" />
              ) : (
                <LoginPage checkForToken={checkForToken} />
              )}
            </Route>

            <Route exact path={"/register/"}>
              {isLoggedIn ? (
                <Redirect to="/main/" />
              ) : (
                <RegistrationPage checkForToken={checkForToken} />
              )}
            </Route>

            <Route exact path={"/main/"}>
              {!isLoggedIn ? checkForToken() : <Main />}
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
