import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { db } from "../components/FirebaseAuth";
import Grid from "@material-ui/core/Grid";
import "./Pages.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 50
    }
}));

const About = () => {
    const classes = useStyles();
    const [team, setTeam] = useState([]);

    db
        .collection("Teams")
        .get()
        .then(data => {
            let teams = [];
            data.forEach(doc => {
                teams.push({
                    teamDocId: doc.id,
                    teamName: doc.data().teamName
                });
            });
            setTeam(teams);
        })
        .catch(err => {
            alert(err);
        });

        let teamItem = team
        ? team.map(item =>
                <li>{item.teamName}</li>
              )
        : <li>Error: No Team Member Loaded</li>;

    return (
        <div className="container-about">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>THE TEAM</b>
                    </h2>
                    <hr />
                    <br />
                    <ul className="teamList">
                        {teamItem}
                    </ul>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>AREAS OF SPECIALTY</b>
                    </h2>
                    <hr />
                    <br />
                    <ul className="specialty">
                        <li>General Health</li>
                        <p>
                            Not feeling well or just need an annual exam? We do
                            it all! We also perform physical therapy and
                            referrals for illness. Whether you're sick or only
                            need some routine maintenance, we're here for you!
                        </p>
                        <br />
                        <li>Special Services</li>
                        <p>
                            Injections for the dog bites, A.R.V, Sangini, and
                            T.T. are available at an affordable price. Besides,
                            Aayanch Clinic also has lab testing services for
                            Blood tests, Urine tests, etc along with X-ray
                            services.
                        </p>
                        <br />
                        <li>Pediatrics</li>
                        <p>
                            At Aayansh Clinic, we treat even the smallest members 
                            of the familty. From infancy to 18, we're here for examination, diagnosis, 
                            treatment and ongoing wellness for your children.
                        </p>
                        <br />
                        <li>Telehealth Services</li>
                        <p>
                            Sometimes there are obstracles to coming into our health facility, but we 
                            are committed to help you regardless. Our health professionals can meet 
                            you over a phone or online call to help you in every way possible. Same 
                            day appointment is available.
                        </p>
                        <br />
                    </ul>
                </Grid>
                <Grid item xs={10} className={classes.section1}>
                    <h2 style={{ marginBottom: 10 }}>
                        <b>CERTIFICATIONS AND AUTHORIZATIONS</b>
                    </h2>
                    <hr />
                    <br />
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/aayansh-clinic.appspot.com/o/images%2Fregistration.png?alt=media&token=10d7c03d-db05-4751-aab1-30618adaa08a"
                        alt="ECG"
                        className="ecg-image"
                    />
                    <img
                        src="https://firebasestorage.googleapis.com/v0/b/aayansh-clinic.appspot.com/o/images%2Fpan.png?alt=media&token=835b1463-8d9b-4e5c-93f4-293997a87d8b"
                        alt="ECG"
                        className="ecg-image"
                    />
                </Grid>
            </Grid>
        </div>
    );
};

export default About;
