import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    //Set the state when an element is clicked
    //Reverse the states
    const [click, setClick] = useState(false);

    // Set the size of an element on mobile screen
    const handleClick = () => setClick(!click);
    const closeMobileViewMenu = () => setClick(false);

    return (
        <nav className="navbar">
            <Link
                to="/"
                onClick={closeMobileViewMenu}
            >
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/aayansh-clinic.appspot.com/o/images%2Flogo.jpg?alt=media&token=f36e2f57-1883-43a2-88c6-9e60ed7a4749"
                    alt="LOGO"
                    className="logo"
                />
            </Link>
            {/* Clicking on menu-icon displays menu item */}
            <div className="menu-icon" onClick={handleClick}>
                {/* Takes to the hamberger menu when clicked else bars */}
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            {/* Set navbar sizes on the basis of screen */}
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                {/* Links to the respected pages both on the browser and mobile view */}
                <li className="nav-item">
                    <Link
                        to="/"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        HOME
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/services"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        SERVICES
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/about"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        ABOUT US
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/contact"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        CONTACT US
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/blogs"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        BLOGS
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
