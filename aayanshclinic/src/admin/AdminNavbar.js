import React, { useState, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { firebaseAuth } from "../components/FirebaseAuth";
import "./AdminNavbar.css";

function AdminNavbar() {
    //Set the state when an element is clicked
    //Reverse the states
    const [click, setClick] = useState(false);

    // Set the size of an element on mobile screen
    const handleClick = () => setClick(!click);
    const closeMobileViewMenu = () => setClick(false);

    let history = useHistory();

    const onClickHandler = useCallback(async event => {
        event.preventDefault();
        firebaseAuth
        .signOut()
        .then(() => {
            history.push("/admin");
        })
        .catch(err => {
            alert(err);
        });
    }, [history]);

    return (
        <>
        <div className="admin-navbar-header">
            <Link
                to="/"
                onClick={closeMobileViewMenu}
            >
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/aayansh-clinic.appspot.com/o/images%2Flogo.jpg?alt=media&token=f36e2f57-1883-43a2-88c6-9e60ed7a4749"
                    alt="LOGO"
                    className="admin-navbar-logo"
                />
            </Link>
        </div>
        <nav className="admin-navbar">
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
                        to="/admin-home"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        EDIT HOME
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/appointment"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        APPOINTMENTS
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/editabout"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        EDIT ABOUT-US
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/editcontact"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        EDIT CONTACT-US
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/editblogs"
                        className="nav-links"
                        onClick={closeMobileViewMenu}
                    >
                        EDIT BLOGS
                    </Link>
                </li>
                <li className="nav-item">
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        type="submit"
                        onClick={onClickHandler}
                    >
                        <b>LOG-OUT</b>
                    </Button>
                </li>
            </ul>
        </nav>
        </>
    );
}

export default AdminNavbar;
