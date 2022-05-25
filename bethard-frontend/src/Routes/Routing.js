import React from "react";
import Path from "./RoutingPath";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../views/homeView/Home";
import Register from "../views/registerView/Register";
import Login from "../views/loginView/Login";
import NotFound from "../views/notFoundView/NotFound";

function Routing({ Header, Footer }) {
    return (
        <Router>
            {Header}
            <Routes>
                <Route path={Path.Home} element={<Home />} />
                <Route path={Path.Register} element={<Register />} />
                <Route path={Path.Login} element={<Login />} />
                <Route path={Path.NotFound} element={<NotFound />} />
            </Routes>
            {Footer}
        </Router>
    );
}

export default Routing;
