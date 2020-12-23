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
import Blogs from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"


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
                <Route path="/blogs" component={Blogs} />
                <Route path="/singleblog" component={SingleBlog} />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
