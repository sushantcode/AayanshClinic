import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import "./Pages.css";
import { db } from "../components/FirebaseAuth";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 50
    },
    section2: {
        marginBottom: 2
    },
    messageForm: {
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            width: "60vw"
        },
        "& .MuiTextareaAutosize-root": {
            margin: theme.spacing(1),
            width: "60vw"
        }
    }
}));

const mapStyles = {
    width: "100%",
    height: "100%"
};

const Contact = props => {
    const classes = useStyles();
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedPlace, setSelectedPlace] = useState({});
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const onSubmitHandler = useCallback(async event => {
        event.preventDefault();
        const {
            name,
            msgEmail,
            phone,
            appointment,
            message
        } = event.target.elements;
        if (msgEmail.value === "") {
            setError("*Must provide an email to reply back.");
        } else {
            try {
                const newMessage = {
                    name: name.value,
                    email: msgEmail.value,
                    phone: phone.value,
                    meetingTime: appointment.value,
                    message: message.value
                };
                // Pushing the user information once user is signed up successfully to database
                db
                    .collection("Message")
                    .add(newMessage)
                    .then(() => {
                        setError("");
                        setOpen(true)
                    })
                    .catch(err => {
                        setError(err.message);
                    });
            } catch (err) {
                setError(err.message);
            }
        }
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const onMarkerClick = (props, marker, e) => {
        setSelectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);
    };

    const onClose = props => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

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
                            noValidate
                            autoComplete="off"
                            onSubmit={onSubmitHandler}
                        >
                            <TextField
                                id="name"
                                label="Name"
                                variant="outlined"
                            />
                            <TextField
                                id="msgEmail"
                                label="Email*"
                                variant="outlined"
                            />
                            <TextField
                                id="phone"
                                label="Phone"
                                variant="outlined"
                                type="email"
                            />
                            <TextField
                                id="appointment"
                                label="Meeting Time"
                                variant="outlined"
                            />
                            <TextField
                                id="message"
                                label="Message"
                                multiline
                                rows={5}
                                variant="outlined"
                            />
                            <br />
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                type="submit"
                            >
                                <b>SEND</b>
                            </Button>
                            <h4 style={{ color: "red" }}>
                                {" "}{error}
                            </h4>
                            <Snackbar
                                open={open}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert onClose={handleClose} severity="success">
                                    You have successfully submitted your request. We will get you back asap. Thank You!!!
                                </Alert>
                            </Snackbar>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={10} className={classes.section1} align="center">
                    <h1 style={{ marginBottom: 10, fontWeight: "normal" }}>
                        Call today to schedule an appointment
                    </h1>
                    <br />
                    <h4 style={{ marginBottom: 25, fontWeight: "normal" }}>
                        Please contact us directly with any questions, comments,
                        or scheduling inquiries you may have.
                    </h4>
                    <h4 style={{ marginBottom: 40, fontWeight: "normal" }}>
                        Fill out the new patient from above and send it to us
                        via contact form to save time when you come in for your
                        appointment.
                    </h4>
                    <h1 style={{ marginBottom: 10, fontWeight: "normal" }}>
                        Aaayansh Clinic
                    </h1>
                    <h4 style={{ marginBottom: 20, fontWeight: "normal" }}>
                        Kalaiya-03, Bara, Nepal
                    </h4>
                    <h4 style={{ marginBottom: 10, fontWeight: "normal" }}>
                        Call us at:
                        <a href="tel:+9779801606066"> +977-9801606066</a>,
                        <a href="tel:+9779808747443"> +977-9808747443</a>
                    </h4>
                    <h4 style={{ marginBottom: 40, fontWeight: "normal" }}>
                        Or email us at:
                        <a href="mailto: aayanshclinic@gmail.com ">
                            {" "}aayanshclinic@gmail.com{" "}
                        </a>
                    </h4>
                    <h1 style={{ marginBottom: 10, fontWeight: "normal" }}>
                        Hours
                    </h1>
                    <h4 style={{ marginBottom: 35, fontWeight: "normal" }}>
                        Monday-Sunday: 8:00AM - 8:00PM
                    </h4>
                    <h4 style={{ marginBottom: 20, fontWeight: "normal" }}>
                        Emergency Service: 24/7
                    </h4>
                </Grid>
                <Grid
                    item
                    xs={12}
                    className={classes.section2}
                    align="center"
                    style={{ position: "relative", height: "50vh" }}
                >
                    <Map
                        google={props.google}
                        zoom={15}
                        style={mapStyles}
                        initialCenter={{
                            lat: 27.03160701614146,
                            lng: 84.99631478347285
                        }}
                    >
                        <Marker
                            onClick={onMarkerClick}
                            name={"Kenyatta International Convention Centre"}
                        />
                        <InfoWindow
                            marker={activeMarker}
                            visible={showingInfoWindow}
                            onClose={onClose}
                        >
                            <div>
                                <h4>
                                    {selectedPlace.name}
                                </h4>
                            </div>
                        </InfoWindow>
                    </Map>
                </Grid>
            </Grid>
        </div>
    );
};

export default GoogleApiWrapper({
    apiKey: "MAP_API_REMOVED_FOR_SECURITY_REASON"
})(Contact);
