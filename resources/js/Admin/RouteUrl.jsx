import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";

class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/admin/" component={Home} />
            </Router>
        );
    }
}

export default RouteUrl;
