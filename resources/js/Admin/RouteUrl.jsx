import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./Account/Login";
import Register from "./Account/Register";
import Error from "./components/Error/Error";

class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/admin/" component={Login} />
                <Route exact path="/admin/register" component={Register} />
                <Route exact path="/admin/home" component={Home} />
                <Route exact path="/admin/err" component={Error} />
            </Router>
        );
    }
}

export default RouteUrl;
