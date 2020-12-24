import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import "./Pages.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 50
    },
    messageForm: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '60vw',
        },
        '& .MuiTextareaAutosize-root': {
            margin: theme.spacing(1),
            width: '60vw',
        }
    }
}));

const Contact = () => {
    const classes = useStyles();

    const onSubmitHandler = () => {};

    return (
        <div className="container-contact">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>NEW PATIENT FORM</b>
                    </h2>
                    <hr />
                    <br />
                    <div className="form-download">
                        <a
                            href="https://firebasestorage.googleapis.com/v0/b/aayansh-clinic.appspot.com/o/files%2FNew%20Patient%20Form.pdf?alt=media&token=a4c22cd4-08ef-4555-b146-fab46411ff88"
                            download
                        >
                            Click here to download (pdf){" "}
                            <i class="fas fa-download" />
                        </a>
                    </div>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>CONTACT US</b>
                    </h2>
                    <hr />
                    <br />
                    <div className="messageBox" justify="center">
                        <h3
                            style={{
                                marginBottom: 10,
                                marginTop: 5,
                                color: "black",
                                fontWeight: "normal"
                            }}
                        >
                            Send Message
                        </h3>
                        <br />
                        <form
                            className={classes.messageForm}
                            noValidate autoComplete="off"
                            onSubmit={onSubmitHandler}
                        >
                            <TextField id="name" label="Name" variant="outlined" />
                            <TextField id="msg-email" label="Email*" variant="outlined" />
                            <TextField id="phone" label="Phone" variant="outlined" />
                            <TextField id="appointment" label="Meeting Time" variant="outlined" />
                            <TextField id="message" label="Message" multiline rows={5} variant="outlined" />
                           <br />
                            <Button variant="contained" color="primary" size="large">
                                <b>SEND</b>
                            </Button>
                            
                        </form>
                    </div>
                </Grid>
                <Grid item xs={10} className={classes.section1} align="center">
                    <h1 style={{ marginBottom: 10, fontWeight: "normal" }}>
                        Call today to schedule an appointment
                    </h1>
                    <br />
                    <h4 style={{ marginBottom: 25, fontWeight: "normal" }}>
                        Please contact us directly with any questions, comments, or scheduling 
                        inquiries you may have.
                    </h4>
                    <h4 style={{ marginBottom: 40, fontWeight: "normal" }}>
                        Fill out the new patient from above and send it to us via contact form to 
                        save time when you come in for your appointment.
                    </h4>
                    <h1 style={{ marginBottom: 10, fontWeight: "normal" }}>
                        Aaayansh Clinic
                    </h1>
                    <h4 style={{ marginBottom: 40, fontWeight: "normal" }}>
                        Kalaiya-03, Bara, Nepal
                    </h4>
                </Grid>
            </Grid>
        </div>
    );
};

export default Contact;
