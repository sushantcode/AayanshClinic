import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./Pages.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 20
    },
    section2: {
        height: 300,
        marginBottom: 30,
        backgroundImage: `url(${"https://thumbs.dreamstime.com/b/medicine-doctor-touching-electronic-medical-record-tablet-dna-digital-healthcare-network-connection-hologram-modern-virtual-154742526.jpg"})`
    }
}));

const Services = () => {
    const classes = useStyles();

    return (
        <div className="container-services">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>SERVICES</b>
                    </h2>
                    <hr />
                    <br />
                    <h1>24 Hour Service</h1>
                    <br />
                    <p>
                        We know that your medical needs don't stop when office
                        hour are over. Using our phone number and our email
                        service, you get a message to our health professionals
                        and make you get service any time, even in the middle of
                        the night.
                    </p>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <br />
                    <h1>Wellness Support</h1>
                    <br />
                    <p>
                        Our team will support you in building a healthier you.
                        No matter what your health needs are, having team
                        support will keep you on the path to meeting them. We
                        work together to connect you with the services you need.
                    </p>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <br />
                    <h1>A Healthy Community</h1>
                    <br />
                    <p>
                        When you choose us, you join a community. We work not
                        just with you but with other members of our community to
                        build a network of people working together for a
                        healthier world.
                    </p>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <h1>Electrocardiography(ECG)</h1>
                    <br />
                    <p>This service is coming soon...</p>
                    <br />
                    <img
                        src="https://www.publicdomainpictures.net/pictures/50000/nahled/ekg-electrocardiogram.jpg"
                        alt="ECG"
                        className="ecg-image"
                    />
                    <br />
                </Grid>
                <Grid item xs={10} className={classes.section2} align="center">
                    <h2 style={{ marginBottom: 10 }}>
                        <b>ONLINE APPOINTMENTS</b>
                    </h2>
                    <hr />
                    <br />
                    <p>This service is coming soon...</p>
                    <br />
                </Grid>
            </Grid>
        </div>
    );
};

export default Services;
