import "./App.css";
import Header from "./Components/Header/Header";
import Dashboard from "./Components/Dashboard/Main";
import Login from "./Components/Home/Login";
import React, { useCallback, useState } from "react";
import SideMenu from "./Components/Header/SideMenu";
import { Redirect, Route, useHistory } from "react-router-dom";
import Trips from "./Components/Trips/Trips";
import Support from "./Components/Support/Support";
import Routes from "./Components/Routes/Route";

let flag = false;
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const history = useHistory();

  if (isSideMenuOpen && window.screen.width >= 768) {
    if (document.getElementById("myContainer")) {
      document.getElementById("myContainer").style.overflowX = "scroll";
      document.getElementById("myContainer").style.width = "75%";
      flag = true;
    }
    if (document.getElementById("trip-table")) {
      document.getElementById("trip-table").style.width = "78%";
      document.getElementById("my-table").style.width = "100%";
    }
    if(document.getElementById("support")){
      document.getElementById("support").style.width = "calc(100vw - 320px )";
    }
  } else if(isSideMenuOpen && window.screen.width < 768){
    document.body.style.overflow = "hidden";
  }

  if (!isSideMenuOpen && window.screen.width >= 768) {
    if (document.getElementById("myContainer")) {
      if (flag)
        document.getElementById("myContainer").style.overflowX = "visible";
      document.getElementById("myContainer").style.width = "100%";
    }
    if (document.getElementById("trip-table")) {
      document.getElementById("trip-table").style.width = "100%";
      document.getElementById("my-table").style.width = "100%";
    }
    if(document.getElementById("support")){
      document.getElementById("support").style.width = "calc(100vw - 20px )";
    }
  }

  const loginHandler = useCallback((loggedValue) => {
    history.push("/dashboard");
    setIsLoggedIn(loggedValue);
  }, []);

  const sideMenuHoverHandler = () => {
    setIsSideMenuOpen(true);
  };

  const sideMenuLeaveHandler = () => {
    setIsSideMenuOpen(false);
  };
  return (
    <div>
      <Route path="/" exact>
        <Redirect to="/login" />
      </Route>
      <Route path="/login">
        <Login login={loginHandler} />
      </Route>
      <Header sideMenuOpen={sideMenuHoverHandler} />
      <div className="myContainer">
        <SideMenu
          sideMenuClose={sideMenuLeaveHandler}
          property={isSideMenuOpen}
        />
        <Route path="/trips">
          <Trips />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/support">
          <Support />
        </Route>
        <Route path="/routes">
          <Routes />
        </Route>
      </div>
      {/* <Route path="/dashboard">
        {isLoggedIn ? (
          <React.Fragment>
            <Header sideMenuOpen={sideMenuHoverHandler} />
            <div className="myContainer"> */}
      {/* {isSideMenuOpen && <SideMenu sideMenuClose={sideMenuLeaveHandler} />} */}
      {/* <SideMenu
                sideMenuClose={sideMenuLeaveHandler}
                property={isSideMenuOpen}
              />
              <Dashboard />
            </div>
          </React.Fragment>
        ) : (
          <Redirect to="/login" />
        )}
      </Route> */}
    </div>
  );
}

export default App;
