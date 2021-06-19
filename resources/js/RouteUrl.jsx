import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Register from "./components/Account/Register";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import New from "./components/New/New";
import Login from "./components/Account/Login";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import EditCustomer from "./components/Account/EditCustomer";

class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product_details/:slug" component={ProductDetails} />
                    <Route exact path="/products-new" component={New} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/edit-customer/:id" component={EditCustomer} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                </div>
            </Router>
        );
    }
}

export default RouteUrl;
