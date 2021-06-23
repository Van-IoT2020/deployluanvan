import React from "react";
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./Account/Login";
import Register from "./Account/Register";
import Error from "./components/Error/Error";

import ShowCategories from "./components/Content/ShowCategories";
import AddCategory from "./components/Content/AddCategory";
import EditCategories from "./components/Content/EditCategories";

import ShowBrand from "./components/Content/ShowBrand";
import AddBrand from "./components/Content/AddBrand";
import EditBrand from "./components/Content/EditBrand";

import ShowSupplier from "./components/Content/ShowSupplier";
import AddSupplier from "./components/Content/AddSupplier";
import EditSupplier from "./components/Content/EditSupplier";

import ShowSlide from "./components/Content/ShowSlide";
import AddSlide from "./components/Content/AddSlide";
import EditSlide from "./components/Content/EditSlide";
import ShowProduct from "./components/Content/ShowProduct";

class RouteUrl extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/admin/" component={Login} />
                {/* <Route exact path="/admin/register" component={Register} /> */}
                <Route exact path="/admin/home" component={Home} />
                <Route exact path="/admin/err" component={Error} />

                <Route exact path="/admin/home/categories" component={ShowCategories} />
                <Route exact path="/admin/home/add-categories" component={AddCategory} />
                <Route exact path="/admin/home/edit-categories/:id" component={EditCategories} />

                <Route exact path="/admin/home/brand" component={ShowBrand} />
                <Route exact path="/admin/home/add-brand" component={AddBrand} />
                <Route exact path="/admin/home/edit-brand/:slug" component={EditBrand} />

                <Route exact path="/admin/home/supplier" component={ShowSupplier} />
                <Route exact path="/admin/home/add-supplier" component={AddSupplier} />
                <Route exact path="/admin/home/edit-supplier/:id" component={EditSupplier} />

                <Route exact path="/admin/home/slide" component={ShowSlide} />
                <Route exact path="/admin/home/add-slide" component={AddSlide} />
                <Route exact path="/admin/home/edit-slide/:id" component={EditSlide} />

                <Route exact path="/admin/home/product" component={ShowProduct} />
                {/* <Route exact path="/admin/home/add-slide" component={AddSlide} />
                <Route exact path="/admin/home/edit-slide/:id" component={EditSlide} /> */}
            </Router>
        );
    }
}

export default RouteUrl;
