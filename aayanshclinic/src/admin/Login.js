import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { firebaseAuth } from "../components/FirebaseAuth";
import "./Admin.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 60,
        marginTop: 20,
        border: 1
    },
    loginForm: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "100%"
        }
    },
    paper: {
        padding: theme.spacing(7),
        textAlign: 'center',
        color: theme.palette.text.secondary
    }
}));

const Login = ({ history }) => {
    const classes = useStyles();
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [emailErr, setEmailErr] = useState("");
    const [passwordErr, setPasswordErr] = useState("");
    const [authErr, setAuthErr] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [resetEmail, setResetEmail] = useState("");

    const onSubmitHandler = useCallback(async event => {
        event.preventDefault();
        const {
            email,
            password
        } = event.target.elements;
        if (email.value === "") {
            setEmailErr("*Email cannot be empty.");
        }
        else {
            setEmailErr("");
        }
        if (password.value === "") {
            setPasswordErr("*Password cannot be empty.");
        }
        else {
            setPasswordErr("");
        }
        if (email.value !== "" && password.value !== ""){
            await firebaseAuth
                .signInWithEmailAndPassword(email.value, password.value)
                .then(() => {
                    history.push("/admin-home");
                })
                .catch((err) => {
                    setAuthErr(err.message);
                    setOpenAlertError(true);
                });
        }
    }, [history]);

    const onResetSubmitHandler = useCallback(async event => {
            event.preventDefault();
            try {
                // sending reset email to the email provided
                await firebaseAuth
                .sendPasswordResetEmail(resetEmail)
                .then(() => {
                    setOpenDialog(false);
                    setResetEmail("");
                    setSuccessMsg("Password reset link has been sent to your email. Please check your email and follow instructions.");
                    setOpenAlertSuccess(true);
                })
                .catch((err) => {
                    setAuthErr(resetEmail);
                    setOpenAlertError(true);
                })
            } catch (err) {
                setAuthErr(err.message);
                setOpenAlertError(true);
            }

            
    }, [resetEmail]);

    const handleCloseAlertError = () => {
        setOpenAlertError(false);
    };

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false);
    };

    const handleClickOpendialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            <nav className="admin-navbar">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/aayansh-clinic.appspot.com/o/images%2Flogo.jpg?alt=media&token=f36e2f57-1883-43a2-88c6-9e60ed7a4749"
                    alt="LOGO"
                    className="admin-logo"
                />
            </nav>
            <div className="container-admin-login">
                <Grid container spacing={0} justify="center">
                    <Grid container item xs={10} className={classes.section1} justify="center">
                        <Paper className={classes.paper}>
                            <h2>
                                <b>ADMIN LOGIN</b>
                            </h2>
                            <br />
                            <form
                                className={classes.loginForm}
                                noValidate
                                autoComplete="off"
                                onSubmit={onSubmitHandler}
                            >
                                {emailErr === ""?
                                    <TextField
                                        id="email"
                                        label="Email*"
                                        variant="outlined"
                                    />
                                    : 
                                    <TextField
                                        error
                                        id="email"
                                        label="Email*"
                                        variant="outlined"
                                    />
                                }
                                {passwordErr === ""?
                                    <TextField
                                        id="password"
                                        label="Password*"
                                        variant="outlined"
                                        type="password"
                                    />
                                    :
                                    <TextField
                                        error
                                        id="password"
                                        label="Password*"
                                        variant="outlined"
                                        type="password"
                                    />
                                }
                                <br />
                                <br />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    type="submit"
                                >
                                    <b>LOGIN</b>
                                </Button>
                                <div style={{minHeight: 45}}>
                                    <h4 style={{ color: "red", marginTop: 10}} >
                                        {" "}{emailErr}
                                    </h4>
                                    <h4 style={{ color: "red", marginTop: 10}} >
                                        {" "}{passwordErr}
                                    </h4>
                                </div>
                                <div style={{textAlign: "center", marginTop: 15}}>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={handleClickOpendialog}
                                    >
                                        <b>Forgot Password? Reset your password here!!!</b>
                                    </Button>
                                </div>
                                <Snackbar
                                    open={openAlertSuccess}
                                    autoHideDuration={6000}
                                    onClose={handleCloseAlertSuccess}
                                >
                                    <Alert onClose={handleCloseAlertSuccess} severity="success">
                                        <h4 style={{ color: "red", marginTop: 10}} >
                                            {" "}{successMsg}
                                        </h4>
                                    </Alert>
                                </Snackbar>
                                <Snackbar
                                    open={openAlertError}
                                    autoHideDuration={6000}
                                    onClose={handleCloseAlertError}
                                >
                                    <Alert onClose={handleCloseAlertError} severity="error">
                                        <h4 style={{ color: "red", marginTop: 10}} >
                                            {" "}{authErr}
                                        </h4>
                                    </Alert>
                                </Snackbar>
                            </form>
                            <Dialog open={openDialog} onClose={handleCloseDialog} aria-labelledby="form-dialog-title">
                                <form
                                    noValidate
                                    autoComplete="off"
                                    onSubmit={onResetSubmitHandler}
                                >
                                    <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            Please enter your valid email address and click SEND RESET LINK button.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="resetEmail1"
                                            label="Email Address"
                                            type="email"
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog} color="primary">
                                            Cancel
                                        </Button>
                                        <Button color="primary" type="submit">
                                            SEND RESET LINK
                                        </Button>
                                    </DialogActions>
                                </form>
                            </Dialog>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default Login;
