import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Alert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { firebaseAuth, db } from "../components/FirebaseAuth";
import ListItem from "@material-ui/core/ListItem";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import "./Admin.css";

const useStyles = makeStyles(theme => ({
    section1: {
        marginBottom: 20
    }
}));

const Appointment = ({ history }) => {
    if (!firebaseAuth.currentUser) {
        history.push("/admin");
    }

    const classes = useStyles();
    const [appointemnt, setAppointment] = useState(null);
    const [error, setError] = useState("");
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [keyword, setKeyword] = useState("");

    db
        .collection("Appointments")
        .get()
        .then(data => {
            let appoint = [];
            data.forEach(doc => {
                appoint.push({
                    appointId: doc.id,
                    name: doc.data().name,
                    date: doc.data().date,
                    time: doc.data().time,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    others: doc.data().others
                });
            });
            setAppointment(appoint);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    const onAppointRequestDeleteHandler = appointId => {
        db
            .doc(`Appointments/${appointId}`)
            .delete()
            .then(() => {
                setError("");
                setSuccessMsg(
                    "Appointment Request has been removed successfully!!!"
                );
                setOpenAlertSuccess(true);
            })
            .catch(err => {
                setError(err.message);
                setOpenAlertError(true);
            });
    };

    const handleCloseAlertError = () => {
        setOpenAlertError(false);
    };

    const handleCloseAlertSuccess = () => {
        setOpenAlertSuccess(false);
    };

    let appointmentItem = appointemnt
        ? appointemnt
              .filter(
                  item =>
                      (keyword === "" && true) ||
                      item.email.substring(0, keyword.length) === keyword
              )
              .map(item =>
                  <Card>
                      <CardActionArea>
                          <CardContent>
                              <List>
                                  <ListItem>
                                      <ListItemText
                                          primary={`Full Name: ${item.name}`}
                                      />
                                      <ListItemText
                                          primary={`Date: ${item.date}`}
                                      />
                                      <ListItemText
                                          primary={`Time: ${item.time}`}
                                      />
                                      <ListItemText
                                          primary={`Email: ${item.email}`}
                                      />
                                      <ListItemText
                                          primary={`Phone: ${item.phone}`}
                                      />
                                      <ListItemText
                                          primary={`Others: ${item.others}`}
                                      />
                                  </ListItem>
                              </List>
                          </CardContent>
                      </CardActionArea>
                      <CardActions>
                          <Button
                              size="small"
                              color="secondary"
                              onClick={() =>
                                  onAppointRequestDeleteHandler(item.appointId)}
                          >
                              <DeleteIcon /> DELETE
                          </Button>
                      </CardActions>
                  </Card>
              )
        : <Typography variant="h4" align="center">
              No Appointment Request Found
          </Typography>;

    return (
        <div className="container-admin-home">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h1>Appointment Requests</h1>
                    <br />
                    <hr />
                    <Grid
                        item
                        xs={10}
                        className={classes.section1}
                        justify="center"
                    >
                        <br />
                        <TextField
                            id="keyword"
                            label="start typing to search..."
                            variant="outlined"
                            onChange={e => {
                                setKeyword(e.target.value);
                            }}
                        />
                        {appointmentItem}
                    </Grid>
                    <Snackbar
                        open={openAlertSuccess}
                        autoHideDuration={6000}
                        onClose={handleCloseAlertSuccess}
                    >
                        <Alert
                            onClose={handleCloseAlertSuccess}
                            severity="success"
                        >
                            <h4 style={{ color: "red", marginTop: 10 }}>
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
                            <h4 style={{ color: "red", marginTop: 10 }}>
                                {" "}{error}
                            </h4>
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </div>
    );
};

export default Appointment;
