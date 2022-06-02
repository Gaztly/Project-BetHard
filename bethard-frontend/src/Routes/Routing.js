import React, { useContext } from "react";
import Path from "./RoutingPath";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../views/homeView/Home";
import Register from "../views/registerView/Register";
import Login from "../views/loginView/Login";
// import NotFound from "../views/notFoundView/NotFound";
import { UserContext } from "../shared/provider/UserProvider";

function Routing({ Header, Footer }) {
    const [user, setUser] = useContext(UserContext);

    const noAccessIfLoggedIn = (view) => {
        return user !== null ? <Home /> : view;
    };

    return (
        <Router>
            {Header}
            <Routes>
                <Route path={Path.Home} element={<Home />} />
                <Route
                    path={Path.Register}
                    element={noAccessIfLoggedIn(<Register />)}
                />
                <Route
                    path={Path.Login}
                    element={noAccessIfLoggedIn(<Login />)}
                />
                <Route path={Path.NotFound} element={<Home />} />
            </Routes>
            {Footer}
        </Router>
    );
}

export default Routing;
