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
import Categories from "./components/Categories/Categories";
import Header from "./components/Header/Header";
import ShowProductBrand from "./components/ShowProductBrand/ShowProductBrand";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import EditCustomer from "./components/Account/EditCustomer";

class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/product_details/:id/:slug" component={ProductDetails} />
                    <Route exact path="/products-new" component={New} />
                    <Route exact path="/categories/:id" component={Categories} />
                    <Route exact path="/cart" component={Cart} />
                    <Route exact path="/edit-customer/:id" component={EditCustomer} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/search" component={Header} />
                    <Route exact path="/brand/:id" component={ShowProductBrand} />
                </div>
            </Router>
        );
    }
}

export default RouteUrl;
