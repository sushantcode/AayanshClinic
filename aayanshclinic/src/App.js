// importing all required functions and packages.
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import About from "./pages/About";
import AdminHome from "./admin/Admin_Home";
import Login from "./admin/Login";
import Navbar from "./components/Navbar"


// Using router and switch to route the pages from one to another
function App() {
    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/contact" component={Contact} />
                <Route path="/services" component={Services} />
                <Route path="/about" component={About} />
                <Route path="/admin" component={Login} />
                <Route path="/admin-home" component={AdminHome} />
            </Switch>
        </Router>
    );
}

export default App;
