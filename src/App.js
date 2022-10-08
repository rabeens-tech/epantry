import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./components/home/Sidebar";
import Header from "./components/home/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@material-ui/core";
import "react-toastify/dist/ReactToastify.css";
import UserSessionContext from "./contexts/UserSessionContext";
import NotFound from "./components/pages/NotFound";
import routes from "./utils/routes";
//import axios from "axios";
import config from "./utils/config";

///import Spinner from "./utils/spinner";




export default function App() {
  const [token, setToken] = useState();


  const save_token = (e) => {
    window.localStorage.setItem("PANTRY_TOKEN", e);
    // console.log(e);
    setToken(e);
  };

  const handleLogOut = (e) => {
    window.localStorage.removeItem("PANTRY_TOKEN");
    // console.log(e)
    setToken(false);
  };

  useEffect(() => {
    let _token = window.localStorage.getItem("PANTRY_TOKEN");

    if (_token === undefined || _token === null) {
      setToken("1234")
      // setToken(false);
    } else {
      setToken(token);
    }
  }, [token]);
  if (token === "true") {
  // if (token === false) {
    return (
      <div>
        <ToastContainer  />
        <Login setToken={save_token}></Login>
      </div>
    );
  }

    return (
      <div>
       <UserSessionContext.Provider
        value={{
        //  token: token,
          handleLogOut: handleLogOut,
        }}
      >
              <div
                style={{
                  display: "flex",
                }}
                className={`wrapper`}
              >
                <ToastContainer rtl pauseOnFocusLoss={true} />
                <Router>
                  <div
                    style={{
                      flex: 1,
                      //background: config.THEME_COLOR,
                      background: config.SIDEBAR_BG,
                    }}
                  >
                    <Sidebar />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 30,
                      minHeight: "100vh",
                    }}
                  >
                    <Header />
                    <div
                      className="container-fluid"
                      style={{ marginBottom: "10px" }}
                    >
                      <Switch>
                        {routes.map((route, index) => {
                          return (
                            <Route
                              key={index}
                              exact={route.exact || false}
                              path={route.path || ""}
                              component={route.component || <> </>}
                            />
                          );
                        })}
                        <Route component={NotFound} />
                      </Switch>
                    </div>
                  </div>
                </Router>
              </div>
              <CssBaseline />
              </UserSessionContext.Provider>
      </div>
    );
  }



