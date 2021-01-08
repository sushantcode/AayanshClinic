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

const EditContact = ({ history }) => {
    if (!firebaseAuth.currentUser) {
        history.push("/admin");
    }

    const classes = useStyles();
    const [msg, setMsg] = useState(null);
    const [error, setError] = useState("");
    const [openAlertError, setOpenAlertError] = useState(false);
    const [openAlertSuccess, setOpenAlertSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [keyword, setKeyword] = useState("");

    db
        .collection("Message")
        .get()
        .then(data => {
            let message = [];
            data.forEach(doc => {
                message.push({
                    docId: doc.id,
                    name: doc.data().name,
                    meetingTime: doc.data().meetingTime,
                    email: doc.data().email,
                    phone: doc.data().phone,
                    message: doc.data().message
                });
            });
            setMsg(message);
        })
        .catch(err => {
            setError(err.message);
            setOpenAlertError(true);
        });

    const onMessageDeleteHandler = docId => {
        db
            .doc(`Message/${docId}`)
            .delete()
            .then(() => {
                setError("");
                setSuccessMsg(
                    "Message has been removed successfully!!!"
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

    let messageItem = msg
        ? msg
              .filter(
                  item =>
                      (keyword === "" && true) ||
                      item.email.substring(0, keyword.length) === keyword
              )
              .map(item =>
                  <div style={{ padding: 20 }}>
                      <Card>
                          <CardActionArea>
                              <CardContent>
                                  <List>
                                      <ListItem>
                                          <ListItemText
                                              primary={`Full Name: ${item.name}`}
                                          />
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText
                                              primary={`Meeting Time: ${item.meetingTime}`}
                                          />
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText
                                              primary={`Email: ${item.email}`}
                                          />
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText
                                              primary={`Phone: ${item.phone}`}
                                          />
                                      </ListItem>
                                      <ListItem>
                                          <ListItemText
                                              primary={`Message: ${item.message}`}
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
                                      onMessageDeleteHandler(item.docId)}
                              >
                                  <DeleteIcon /> DELETE
                              </Button>
                          </CardActions>
                      </Card>
                  </div>
              )
        : <Typography variant="h4" align="center">
              No Message Found
          </Typography>;

    return (
        <div className="container-admin-home">
            <Grid container spacing={0} justify="center">
                <Grid item xs={10} className={classes.section1}>
                    <h1>Message</h1>
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
                        {messageItem}
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

export default EditContact;
