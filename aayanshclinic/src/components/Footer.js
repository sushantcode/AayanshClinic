import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="AppFooter">
            <div className="footercontainer">
                <div className="footrow">
                    <div className="row2">
                        <p className="Terms">
                            Copyright &copy;{new Date().getFullYear} 2020 Aayansh Clinic | All Rights
                            Reserved{" "} | {" "}
                            <Link
                                to="/admin"
                                className="adminLink">
                                ADMIN-LOGIN
                            </Link>
                        </p>
                        <p className="SocialLogo">
                            <a
                                href="https://www.facebook.com/Aayansh-Clinic-101411295068765"
                                className="footerLinks"
                            >
                                {" "}<i class="fab fa-facebook" />{" "}
                            </a>
                            <a
                                href="https://www.twitter.com/"
                                className="footerLinks"
                            >
                                {" "}<i class="fab fa-twitter-square" />{" "}
                            </a>
                            <a
                                href="https://www.instagram.com/"
                                className="footerLinks"
                            >
                                {" "}<i class="fab fa-instagram-square" />{" "}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
