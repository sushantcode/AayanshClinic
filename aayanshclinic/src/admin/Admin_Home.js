import React from "react";
import Button from "@material-ui/core/Button";
import { firebaseAuth } from "../components/FirebaseAuth";
import "./Admin.css";

const AdminHome = ({ history }) => {
    const onClickHandler = () => {
        firebaseAuth
        .signOut()
        .then(() => {
            history.push("/admin");
        })
        .catch(err => {
            alert(err);
        });
    };

    return (
    <div className="container-home">
        <p>Admin Home Page.....</p>
        <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            onClick={onClickHandler}
        >
            <b>LOG-OUT</b>
        </Button>
    </div>
    );
};

export default AdminHome;
