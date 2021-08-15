import React from "react";
import ReactDOM from "react-dom";
import RouteUrl from "./RouteUrl";

//  Redux
import { Provider } from 'react-redux';
import store from "./ReduxConfig/Store";

function Index() {
    return <RouteUrl />;
}

export default Index;

if (document.getElementById("app")) {
    ReactDOM.render(<Provider store={store}><Index /></Provider>,document.getElementById("app"));
}
