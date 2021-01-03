// importing all required functions and packages.
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import AdminHome from "./admin/Admin_Home";
import Login from "./admin/Login";
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import RouteLayout from "./components/RouteLayout"


// Using router and switch to route the pages from one to another
function App() {
    return (
        <Router>
            <Switch>
                <RouteLayout exact path="/" component={Home} layout="Nav" />
                <RouteLayout path="/contact" component={Contact} layout="Nav"  />
                <RouteLayout path="/services" component={Services} layout="Nav"  />
                <RouteLayout path="/about" component={About} layout="Nav"  />
                <RouteLayout path="/admin" component={Login} layout=""  />
                <RouteLayout path="/admin-home" component={AdminHome} layout=""  />
                <RouteLayout path="/blogs" component={Blogs} layout="Nav"  />
                <RouteLayout path="/singleblog/:blogDocId" component={SingleBlog} layout="Nav"  />
            </Switch>
        </Router>
    );
}

export default App;
