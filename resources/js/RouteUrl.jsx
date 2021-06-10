import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import New from "./components/New/New";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import ProductDetails from "./components/ProductDetails/ProductDetails";
class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product_details/:id/:slug" component={ProductDetails} />
                    <Route exact path="/products-new" component={New} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

export default RouteUrl;
